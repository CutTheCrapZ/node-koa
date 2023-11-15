//封装的方法
var config = require("../app/config");
var request = require("request");
function httpRequest(method, url, data) {
  method = method.toLowerCase();
  // 封装request请求 post get
  // var requestUrl = config.webapi + url;
  // console.log(requestUrl, "真实的java接口地址")
  if (method == "get") {
    console.log(url);
    return new Promise(function (resolve, reject) {
      request(
        {
          url: url,
          method: "GET",
          form: data,
        },
        function (err, response, body) {
          var data = JSON.parse(body);
          console.log(data.code, "get result");
          resolve(data);
          //   res.json(data)
        }
      );
    });
  } else if (method == "post") {
    return new Promise(function (resolve, reject) {
      request(
        {
          url: url,
          method: "POST",
          form: data,
        },
        function (err, response, body) {
          var data = JSON.parse(body);
          console.log(data.code, "post result");
          resolve(data);
          //   res.json(data)
        }
      );
    });
  }
}
module.exports = httpRequest;
