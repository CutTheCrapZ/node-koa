const OneDrive = require("../models/oneDrive.js");
const OneDriveTools = require("../utils/onedrive.js");
module.exports = () => {
  let getRefreshToken = setInterval(async () => {
    try {
      let res = await OneDrive.find({}).sort({ _id: -1 }).limit(1);
      let refreshRes = await OneDriveTools.refresh(res[0].refresh_token);
      let d = JSON.parse(refreshRes.body);
      d.created_d = new Date();
      console.log(d)
      const o = new OneDrive(d);
      let updateRes = await o.save();
      console.log(updateRes)
    } catch (error) {
      console.log(error);
      clearInterval(getRefreshToken);
    }
  }, 43200000);
  // 86400000 24小时
  return;
};
