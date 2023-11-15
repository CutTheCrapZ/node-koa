const Router = require("koa-router"), // 引入依赖
  config = require("../app/config"), // 引入配置文件
  userRouter = new Router({ prefix: config.app.routerBaseApi }), // 设置接口前缀
  U = require("../controller/user"); // 引入中间件
   // 设置接口路径，以及中间件
userRouter.get("/user", U.create)
.get("/user/I",U.entry)//获取访问信息
.post("/user/login",U.login)//登录并获取路由

module.exports = userRouter; // 导出
