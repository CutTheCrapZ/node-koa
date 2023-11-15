//引入mongoose
const mongoose = require("mongoose");
//定义字符串常量
const db_url = "mongodb://127.0.0.1:27017/test";
//1.连接数据库
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });
const Schema = mongoose.Schema;
const AnimalSchema = new Schema({
  animal: String,
  name: String,
  age: Number,
  gender:{
    default:"man",
    type:String
  }
});
const AnimalModel = mongoose.model("animal", AnimalSchema);

//2.连接成功
const db = mongoose.connection;
db.on("connected", function () {
  console.log("连接成功：", db_url);
  let animal= new AnimalModel({
    animal: "dog1111",
    name: "TangJunHao",
    age: 23,
  })
  let res=animal.save();
  console.log()
  // AnimalModel.create([{
  //   animal: "dog1111",
  //   name: "TangJunHao",
  //   age: 23,
  // },{
  //   animal: "dog",
  //   name: "XieWenXuan",
  //   age: 23,
  // }]).then((data) => {
  //   console.log("添加成功")
  // }).catch((err)=>{
  //   console.log(err)
  //   console.log("添加失败")
  // });
});
//3.连接失败
db.on("error", function (err) {
  console.log("连接错误：", err);
});
//4.断开连接
db.on("disconnection", function () {
  console.log("断开连接");
});
module.exports = mongoose;
