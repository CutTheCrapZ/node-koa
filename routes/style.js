const Router = require("koa-router"), // 引入依赖
  config = require("../app/config"), // 引入配置文件
  styleRouter = new Router({ prefix: config.app.routerBaseApi }), // 设置接口前缀
  S = require("../controller/style"); // 引入中间件
// 设置接口路径，以及中间件
styleRouter
  .get("/style", S.searchList)
  .get("/style/detail", S.searchDetail)
  .post("/style/upload",S.upload)
  .post("/style/delete",S.deleteById)
module.exports = styleRouter; // 导出
