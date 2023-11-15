const request = require("./request");
var config = require("../app/config");
class Tools {
  // #私有成员变量
  #baiduReq =
    "https://api.map.baidu.com/location/ip?ip=111.206.214.37&coor=bd09ll&ak=";
  getClientIP(req) {
    return (
      req.headers["x-forwarded-for"] || // 判断是否有反向代理 IP
      req.headers["x-real-ip"]
    );
  }
  async ipToLocal(ak, callback) {
    let res = await request("GET", this.#baiduReq + config.baiduAk);
    return res||"error"
  }
}
module.exports = new Tools();
//
