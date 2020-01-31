const Koa = require("koa");
const Router = require("koa-router");
const usersRouter = require("../modules/users");
const authRouter = require("../modules/auth");

const app = new Koa();
const router = new Router();

router.get("/", ctx => {
    ctx.body = "ok";
});

router.use("/users", usersRouter.routes());
router.use("/auth", authRouter.routes());

app.use(router.allowedMethods());
app.use(router.routes());

app.listen(3000);
