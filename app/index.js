// 入口文件
// app/index.js
const Koa = require("koa");
const onedrive = require("../utils/onedrive");
const app = new Koa();
/* 配置文件 */
const config = require("./config.js");
// 跨域
const cors = require("koa2-cors");
app.use(
  cors({
    origin: function (ctx) {
      //设置允许来自指定域名请求
      // const whiteList = ["http://www.cupid.ink", "http://localhost:5173", "http://localhost:80"]; //可跨域白名单
      // let url = ctx.header.referer.substr(0, ctx.header.referer.length - 1);
      // if (whiteList.includes(url)) {
      //   return url; //注意，这里域名末尾不能带/，否则不成功，所以在之前我把/通过substr干掉了
      // }
      return "*"; //默认允许本地请求3000端口可跨域
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], //设置所允许的HTTP请求方法
    allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
    exposeHeaders: ["WWW-Authenticate", "Server-Authorization"], //设置获取其他自定义字段
  })
);

//bodyParser中间件 获取post请求参数
const bodyParser = require("koa-bodyparser");
app.use(bodyParser());

/* 连接数据库 */
//引入mongoose
const mongoose = require("mongoose");
// const mongoUrl = `mongodb://${ config.mongodb.user }:${ config.mongodb.password }@${ config.mongodb.host }:${ config.mongodb.port }/${ config.mongodb.database }`;
const mongoUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", () => {
  console.log("数据库连接出错!");
});
db.once("open", () => {
  console.log("数据库连接成功！");
});
// 一次加载所有路由
const useRoutes = require("../routes/index.js"); // 引入router下的index.js文件
useRoutes(app); // 向这个路由加载文件传入app
// // 1.加载路由的第一种方法 一个路由一个路由加载
// app.use(userRouter.routes()) // 加载路由
// app.use(userRouter.allowedMethods()) // 请求方法验证

module.exports = app;
