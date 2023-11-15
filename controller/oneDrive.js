const request = require("request");
const OneDriveTools = require("../utils/onedrive.js");
const OneDrive = require("../models/oneDrive.js");
oneDriveConfig = {
  client_id: "b3330c56-2c98-4d84-95c2-baba2db2f6c8",
  scope: "files.readwrite.all offline_access",
  response_type: "code",
  // 重定向回后端获取token接口
  redirect_uri: "http://localhost:5173",
  // 客户端密码
  client_secret: "-AU8Q~jQSyP3IpRPoYG6Ba6cJ3.CJovApUL3Ibj5",
  grant_type: "authorization_code",
};
class OneDriveController {
  async getCode(ctx, next) {
    let path = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${oneDriveConfig.client_id}&scope=${oneDriveConfig.scope}&response_type=${oneDriveConfig.response_type}&redirect_uri=${oneDriveConfig.redirect_uri}`;
    // 拼接链接，返回前端进行登陆获取code跳转
    ctx.body = {
      code: 200,
      path,
    };
  }
  async searchToken(ctx, next) {
    if (!ctx.query.code) {
      ctx.body = {
        code: 400,
        msg: "参数错误",
      };
      return;
    }
    let res = await OneDriveTools.sendMultipart(ctx.query.code);
    ctx.body = {
      data: res,
      code: 200,
    };
  }
  async refreshToken(ctx, next) {
    if (!ctx.query.refresh_token) {
      ctx.body = {
        code: 400,
        msg: "参数错误",
      };
      return;
    }
    let res = await OneDriveTools.refresh(ctx.query.refresh_token);
    ctx.body = {
      data: res,
      code: 200,
    };
  }
  async uploadToken(ctx, next) {
    if (!ctx.query.refresh_token || !ctx.query.access_token) {
      ctx.body = {
        code: 400,
        msg: "参数错误",
      };
      return;
    }
    let d = {
      access_token: ctx.query.access_token,
      refresh_token: ctx.query.refresh_token,
      token_type: ctx.query.token_type,
      created_d: new Date(),
    };
    const o = new OneDrive(d);
    let res = await o.save();
    ctx.body = {
      data: res,
      code: 200,
    };
  }
  async getToken(ctx, next) {
    let res = await OneDrive.find({}).sort({ _id: -1 }).limit(1);
    ctx.body = {
      data: res[0],
      code: 200,
    };
    return res;
  }
}

module.exports = new OneDriveController();
