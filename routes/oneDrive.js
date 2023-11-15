const Router = require("koa-router"), // 引入依赖
  config = require("../app/config"), // 引入配置文件
  oneDriveRouter = new Router({ prefix: config.app.routerBaseApi }), // 设置接口前缀
  O = require("../controller/oneDrive"); // 引入中间件
oneDriveRouter
  .get("/oneDrive/getCode", O.getCode)
  .get("/oneDrive/getToken", O.getToken)
  .get("/oneDrive/refreshToken", O.refreshToken)
  .get("/oneDrive/uploadToken", O.uploadToken)
  .get("/oneDrive/searchToken", O.searchToken);
  
module.exports = oneDriveRouter; // 导出
