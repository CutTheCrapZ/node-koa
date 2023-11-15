const crawler = require("../utils/crawler"); //爬取数据
class CrawlerController {
  // 创建类
  async create(ctx, next) {
    // 中间件
    if (ctx.query.chapter) {
      try {
        let res = await crawler.getNovel(ctx.query.chapter);
        let { title, txt } = res;
        ctx.body = JSON.stringify({
          code: 200,
          data: {
            title,
            txt,
          },
          msg: "success",
          success: true,
        });
      } catch (error) {
        ctx.body = JSON.stringify({
          code: 400,
          data: null,
          msg: `爬取章节${ctx.query.chapter}出错`,
          success: false,
        }); // 请求响应
      }
    } else {
      ctx.body = JSON.stringify({
        code: 400,
        data: null,
        msg: "获取哪章?chapter带过来",
        success: false,
      }); // 请求响应
      await next();
    }
  }
}

module.exports = new CrawlerController();
