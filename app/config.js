// config.js
const dotenv = require("dotenv")
//加载.env
dotenv.config()

// module.exports = {
//   APP_PORT
// } = process.env
const config = {
  mongodb: {
    host: "127.0.0.1",
    database: "cupid",
    port: 27017,
    user: "", //非必填
    password: "", //非必填
  },
  app: {
    port: process.env.APP_PORT || 3000,
    routerBaseApi: "/api",
  },
  baiduAk:"25Q7UlXNuraTV9yV6C5gLcayrualqqCl",
  webapi:'/'
};
module.exports = config;
