const Router = require("koa-router"),
  config = require("../app/config"),
  sentenceRouter = new Router({ prefix: config.app.routerBaseApi }),
  S = require("../controller/sentence");
sentenceRouter
  .post("/sentence/update", S.update)
  .get("/sentence", S.searchList)
  .post("/sentence/delete", S.deleteById);
module.exports = sentenceRouter; // 导出
