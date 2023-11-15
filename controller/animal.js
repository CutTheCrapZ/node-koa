const Animal = require("../models/animal.js");
class AnimalController {
  // 创建类
  async create(ctx, next) {
    let model = ctx.request.body;
    // let animal = new Animal(model);
    if (!model.name) return (ctx.body = "name is required");
    if (!model.age) return (ctx.body = "age is required");
    model.storage_time = new Date();
    let animal = new Animal(model);
    let res = await animal.save();
    console.log(res);
    ctx.body = "添加成功";
  }
  async getAll(ctx, next) {
    // 中间件
    // console.log(ctx.params.id);
    let all = await Animal.find();
    let arr = [];
    all.forEach((ele, index) => {
      arr[index] = ele;
    });
    ctx.body = JSON.stringify(arr); // 请求响应
  }
  async getById(ctx, next) {
    // 中间件
    // console.log(ctx.params.id);
    ctx.body = "getById请求成功"; // 请求响应
  }
}

module.exports = new AnimalController();
