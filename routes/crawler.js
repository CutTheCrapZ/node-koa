const Router = require("koa-router") // 引入依赖

const userRouter = new Router({ prefix: "/crawler" }) // 设置接口前缀

const { create } = require('../controller/crawler') // 引入中间件

userRouter.get('/', create) // 设置接口路径，以及中间件

module.exports = userRouter // 导出