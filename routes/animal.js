const Router = require("koa-router"), // 引入依赖
  config = require("../app/config"), // 引入配置文件
  animalRouter = new Router({ prefix: config.app.routerBaseApi }), // 设置接口前缀
  A = require("../controller/animal"); // 引入中间件
animalRouter.post("/animal/add", A.create).get("/animal/getById/:id", A.getById).get("/animal/getAll", A.getAll); // 设置接口路径，以及中间件

module.exports = animalRouter; // 导出
