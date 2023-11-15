const myRequest = require("request");
const myCheerio = require("cheerio");
const iconv = require("iconv-lite");
const { readFileSync, writeFile, appendFile, createReadStream } = require("fs");
// 当前章节
let chapter;
// 指定章节后缀
let c = "";
// 网络地址
// let URL = "https://www.ddyueshu.com/28666_28666205/";从红月开始
function getNovel(chapter) {
  let URL = "https://www.ddyueshu.com/5_5871/"; //剑来
  let file = readFileSync("./Catalog.txt", "utf8");
  URL += file.split(",")[chapter];
  URL = URL.replace("\uFEFF", "");
  return new Promise((resolve, reject) => {
    request(URL, function (err, res, body) {
      if (err) {
        reject(err);
        throw err;
      }
      let html = iconv.decode(body, "gb2312");
      let $ = myCheerio.load(html, { decodeEntities: false });
      let txt = $("#content").html(); //内容
      let title = $("h1").html(); //标题
      txt = txt.replace(/<br>/g, "");
      txt = txt.split("<script>")[0];
      console.log(`-----------\n标题:${title}`);
      console.log(`-----------\n内容:${txt}`);
      resolve({txt,title});
    });
  });
}
// const getNovel = (chapter) => {
//   let URL = "https://www.ddyueshu.com/5_5871/"; //剑来
//   let file = readFileSync("../jianlaiCatalog.txt", "utf8");
//   URL += file.split(",")[chapter];
//   URL = URL.replace("\uFEFF", "");
//   request(URL, function (err, res, body) {
//     let html = iconv.decode(body, "gb2312");
//     let $ = myCheerio.load(html, { decodeEntities: false });
//     let txt = $("#content").html(); //内容
//     let title = $("h1").html(); //标题
//     txt = txt.replace(/<br>/g, "");
//     txt = txt.split("<script>")[0];
//     console.log(`-----------\n标题:${title}`);
//     console.log(`-----------\n内容:${txt}`);
//     return txt;
//   });
  //   var res = request('GET', 'http://example.com');
  // console.log(res.getBody());
  // 获取当前章节

  //   readFile("./flag/jianlaiFlag.txt", "utf8", (err, index) => {
  //     if (err) throw err;
  //     console.log(`-----------\n当前记录章节:${index * 1 + 1}`);
  //     chapter = index;
  //     readFile("./flag/jianlaiCatalog.txt", "utf8", (err, data) => {
  //       if (err) throw err;
  //       URL += data.split(",")[chapter];
  //       console.log(`-----------\n网络地址:${URL}`);
  //       URL = URL.replace("\uFEFF", "");
  //       request(URL, function (err, res, body) {
  //         let html = iconv.decode(body, "gb2312");
  //         let $ = myCheerio.load(html, { decodeEntities: false });
  //         let txt = $("#content").html(); //内容
  //         let title = $("h1").html(); //标题
  //         txt = txt.replace(/<br>/g, "");
  //         txt = txt.split("<script>")[0];
  //         console.log(`-----------\n标题:${title}`);
  //         console.log(`-----------\n内容:${txt}`);
  //         //获取目录列表
  //         // txt = txt.split("<dd>");
  //         // console.log(txt[0].indexOf("第"));
  //         // console.log(txt[88].indexOf("章"));
  //         // let t=''
  //         // txt.forEach((ele) => {
  //         //   if (ele.indexOf("第") > 0 && ele.indexOf("章") > 0) {
  //         //     ele = ele.split('"')[1];
  //         //     ele = ele.split("/")[2];
  //         //     t+=ele+','
  //         //   }
  //         // });
  //         appendFile("./flag/jianlai.txt", txt, "utf-8", function (err) {
  //           console.log(err, "error");
  //         });
  //         chapter++;
  //         writeFile("./flag/jianlaiFlag.txt", String(chapter), (e) => {
  //           if (err) throw err;
  //           console.log(`-----------\n章节记录更新:${chapter}`);
  //         });
  //       });
  //     });
  //   });
// };
function request(url, callback) {
  //request module fetching url
  let options = {
    url: url,
    encoding: null,
    headers: null,
  };
  myRequest(options, callback);
}
// request(URL, function (err, res, body) {
//   let html = iconv.decode(body, "gb2312");
//   let $ = myCheerio.load(html, { decodeEntities: false });
//   let txt = $("#list").html(); //内容
//   //获取目录列表
//   txt = txt.split("<dd>");
//   console.log(txt[0].indexOf("第"));
//   console.log(txt[88].indexOf("章"));
//   let t=''
//   txt.forEach((ele) => {
//     if (ele.indexOf("第") > 0 && ele.indexOf("章") > 0) {
//       ele = ele.split('"')[1];
//       ele = ele.split("/")[2];
//       t+=ele+','
//     }
//   });
//   console.log(t);
//   appendFile("./flag/jianlaiCatalog.txt", t, "utf-8", function (err) {
//     console.log(err, "error");
//   });
// });
module.exports = {
  getNovel
};
