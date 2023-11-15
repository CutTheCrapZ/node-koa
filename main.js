const app = require("./app");
const config = require("./app/config.js");
/* https */
// const https = require("https");
// const fs = require("fs");
// const options = {
//   key: fs.readFileSync("ssl/www.cupid.ink.key"),
//   cert: fs.readFileSync("ssl/www.cupid.ink.pem"),
// };
// const enforceHttps = require("koa-sslify").default;
// app.use(enforceHttps());
// https.createServer(options, app.callback()).listen(config.app.port, () => {
//   console.log(`服务器在${config.app.port}启动成功~`);
// });
/* https */
app.listen(config.app.port, () => {
  console.log(`服务器在${config.app.port}启动成功~`);
});
const getRefreshToken=require("./utils/get_refresh_token")
getRefreshToken()