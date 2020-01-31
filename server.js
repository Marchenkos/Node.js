const Koa = require("koa");
const mongoose = require("mongoose");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

async function start() {
    try{
        await mongoose.connect("mongodb+srv://marchenkus:kiskis1234@cluster0-xjbtb.mongodb.net/test", {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        app.use(router.allowedMethods());
        app.use(router.routes());

        app.listen(3000);
    } catch (e) {
        console.log(e);
    }
}

router.get("/", ctx => {
    ctx.body = "ok";
});

start();
