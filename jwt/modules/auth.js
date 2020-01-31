const Router = require("koa-router");
const uuid = require("uuid");
const { compareSync } = require("bcryptjs");
const jwt = require('jsonwebtoken');
const jwtMiddleware = require("koa-jwt");
const bodyParser = require("koa-bodyparser");
const config = require("../data/config");
const userService = require("../client/users");
const tokenService = require("../client/auth");

const router = new Router();

async function newTokenPair(userId) {
    const newRefreshToken = uuid();

    await tokenService.add({
        token: newRefreshToken,
        userId
    });

    return {
        token: jwt.sign({id: userId}, config.secret),
        refreshToken: newRefreshToken
    };
}

router.post("/login", bodyParser(), async ctx => {
    const { login, password } = ctx.request.body;
    const user = await userService.find({ login })

    if (!user || !compareSync(password, user.password)) {
        ctx.body = "Not correct data";
    }

    ctx.body = await newTokenPair(user.id);
});

router.post("/refresh", bodyParser(), async ctx => {
    const { refreshToken } = ctx.request.body;
    const dbToken = await tokenService.find({ token: refreshToken });

    if (!dbToken) {
        ctx.body = "Token not found";
    }

    await tokenService.remove({ token: refreshToken });

    await newTokenPair(dbToken.userId);
})

// router.post("/logout", jwtMiddleware({ secret: config.secret }), async ctx => {
//     console.log(ctx.state);
// })

router.post('/logout', jwtMiddleware({ secret: config.secret }), async ctx => {
    const { id: userId } = ctx.state.user;

    await tokenService.remove({
      userId,
    });

    ctx.body = { success: true };
  });

module.exports = router;