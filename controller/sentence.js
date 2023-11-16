const Sentence = require("../models/sentence");
class SentenceController {
  async update(ctx, next) {
    let res;
    console.log(ctx.request.body);
    if (ctx.request.body.id) {
      let obj = ctx.request.body;
      let id = obj.id;
      delete obj.id;
      obj.updated_d = new Date();
      res = await Sentence.index.findByIdAndUpdate(id, {
        $set: ctx.request.body,
      });
    } else {
      ctx.request.body.created_d = new Date();
      res = await new Sentence.index(ctx.request.body).save();
    }
    ctx.body = {
      code: 200,
      data: res,
    };
  }
  async searchList(ctx, next) {
    if (!ctx.query.curPage || !ctx.query.pageSize) {
      ctx.body = {
        msg: "参数错误",
        code: 400,
      };
      return;
    }
    let total = await Sentence.index.countDocuments().exec();
    let res = await Sentence.index
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
  async deleteById(ctx, next) {
    if (!ctx.request.body.id) {
      ctx.body = {
        msg: "参数错误",
        code: 400,
      };
      return;
    }
    let res = await Sentence.index.deleteOne({ _id: ctx.request.body.id });
    console.log(res);
    ctx.body = {
      msg: "success",
      code: 200,
    };
  }
}
module.exports = new SentenceController();
