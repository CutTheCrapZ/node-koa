const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// 创建一个schema,对应数据库字段
const OneDriveSchema = new Schema({
  access_token: String,
  refresh_token: String,
  expires_in: Number,
  ext_expires_in: Number,
  token_type: String,
  scope: String,
  created_d: Date,
});
exports = module.exports = mongoose.model("one_drive", OneDriveSchema);
