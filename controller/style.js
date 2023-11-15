const Style = require("../models/style.js");
class StyleController {
  // 创建类
  async searchList(ctx, next) {
    if (!ctx.query.curPage || !ctx.query.pageSize) {
      ctx.body = {
        msg: "参数错误",
        code: 400,
      };
      return;
    }
    let total = await Style.detail.countDocuments().exec();
    let res = await Style.detail
      .find()
      .limit(ctx.query.pageSize)
      .skip(ctx.query.pageSize * (ctx.query.curPage - 1));
    ctx.body = {
      list: res,
      pagination: {
        total,
        pageSize: ctx.query.pageSize * 1,
        curPage: ctx.query.curPage * 1,
      },
      code: 200,
    };
  }
  async searchDetail(ctx, next) {
    console.log(ctx.query.id);
    if (!ctx.query.id) {
      ctx.body = {
        msg: "参数错误",
        code: 400,
      };
      return;
    }
    let res = await Style.detail.find();
    console.log(res);
    ctx.body = {
      data: res,
      code: 200,
    };
  }
  async upload(ctx, next) {
    let obj = ctx.request.body;
    let res;
    console.log(obj);
    if (obj.id) {
      obj.updated_d = new Date();
      let id=obj.id
      delete obj.id
      res = await Style.detail.findByIdAndUpdate(id, { $set: obj });
    } else {
      obj.created_d = new Date();
      const o = new Style.detail(obj);
      res = await o.save();
    }
    ctx.body = {
      code: 200,
      data: res,
    };
  }
  async deleteById(ctx, next) {
    if (!ctx.request.body.id) {
      ctx.body = {
        msg: "参数错误",
        code: 400,
      };
      return;
    }
    let res = await Style.detail.deleteOne({ _id: ctx.request.body.id });
    console.log(res);
    ctx.body = {
      msg: "success",
      code: 200,
    };
  }
}

module.exports = new StyleController();
