const tools = require("../utils/info");
const Local = require("../models/local.js");
const User = require("../models/user.js");
const JWT = require("../utils/JWT.js");
class UserController {
  // 创建类
  async create(ctx, next) {
    // 中间件
    ctx.body = "请求成功"; // 请求响应
  }
  async entry(ctx, next) {
    let isProxy = tools.getClientIP(ctx.request);
    if (isProxy) {
      console.log("反向代理");
    } else {
      let local = await tools.ipToLocal();
      let model = {
        city: local.content.address_detail.city,
        street: local.content.address_detail.street,
        point: local.content.point,
        storage_time: new Date(),
      };
      let L = new Local(model);
      let res = await L.save();
      ctx.body = "ok";
    }
  }
  async login(ctx, next) {
    let res = await User.find({}, { name: 1, path: 1, component: 1, meta: 1 });
    let jwt = new JWT(12321312);
    let token = jwt.generateToken();
    ctx.body = {
      token,
      list: res,
      code: 200,
    };
  }
}

module.exports = new UserController();
