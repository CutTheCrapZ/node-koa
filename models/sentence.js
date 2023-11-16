const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sentenceListSchema = new Schema({
  sentences: String,
  tag: Number,
  like:Number,
  created_d: Date,
  updated_d: Date,
});
const sentenceCommentSchema = new Schema({
  pid: String,
  comment: String,
  created_d: Date,
  updated_d: Date,
});
let sentence = {
  index: mongoose.model("sentence", sentenceListSchema),
  comment: mongoose.model("sentence_comment", sentenceCommentSchema),
};
exports = module.exports = sentence;
