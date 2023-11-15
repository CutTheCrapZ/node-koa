const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// 创建一个schema,对应数据库字段
const UserSchema=new Schema({
    name:String,
    path:String,
    component:String,
    meta:Object,
    created_d:Date,
})
exports = module.exports = mongoose.model('routes', UserSchema);    