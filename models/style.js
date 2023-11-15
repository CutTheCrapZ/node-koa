const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// 查询列表
const StyleSchema=new Schema({
    src:String,
    detail_id:String,
    desc:String,
    created_d:Date
})
// 查询详情
const StyleDetailSchema=new Schema({
    imgUrl:Array,
    desc:String,
    links:Object,
    created_d:Date,
    updated_d:Date,
})
let style={
    list:mongoose.model('style', StyleSchema),
    detail:mongoose.model('style_detail', StyleDetailSchema)
}
exports = module.exports = style;    