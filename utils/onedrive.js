// PMN8Q~3BUzhT38zLSamm~82WxI06lSdZ~ZKYDcMV 客户端密码
const request = require("request");
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
class OneDriveTools {
  static refresh(refresh_token) {
    let { response_type, ...formData } = oneDriveConfig;
    // let formData={}
    // formData.client_id = oneDriveConfig.client_id;
    // formData.redirect_uri = oneDriveConfig.redirect_uri;
    // formData.client_secret = oneDriveConfig.client_secret;
    // M.C107_SN1.-CSgNethOnbtO4Og3i7mVbccFzibIvpVVifcSoTLMuUhtdcR!owiiuiNWsYsouoXgEmjutEzno9HwWqPb20WMzbupexavHfQRyohtfUQI9bP4IWGWtw51xmtW!HvxUgakA88*gkvdGeSzjUOmeKqoZYKrzBZ0l3hjRh2BNAefOX*f3ZUXbqY7oDEPF1Q0xSt7gQYu!0PdPMHOcTO84eQY*wxfk8Q5OQauS4yfsXvoPiPB50kZ6JS3XMdax8!GIwT*F6XxGixNEFxP5lQb7hfx5rjGRPtfWBwvaDYnK63uCSFZr1!!*x*7rGiDvlmx4Vhwb6Lqxzc74hHiUlTOZMu2*hUVCMcIk7e0Lf6myfYgIcwF
    formData.refresh_token = refresh_token;
    formData.grant_type = "refresh_token";
    let options = {
      method: "POST",
      url: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      formData: formData,
    };
    return new Promise((resolve, reject) => {
      let readStream = request(options, (error, response, body) => {
        if (!error) {
          resolve({ response, body });
        } else {
          reject(error);
        }
      });
    });
  }
  static sendMultipart(code) {
    let { response_type, ...formData } = oneDriveConfig;
    formData.code = code;
    let options = {
      method: "POST",
      url: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      formData: formData,
    };
    return new Promise((resolve, reject) => {
      let readStream = request(options, (error, response, body) => {
        if (!error) {
          resolve({ response, body });
        } else {
          reject(error);
        }
      });
    });
  }
}
module.exports = OneDriveTools;
