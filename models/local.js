const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocalSchema = new Schema({
    city:String,
    street:String,
    point: Object,
    storage_time:{
        type:Date
    }
});

exports = module.exports = mongoose.model('local', LocalSchema);