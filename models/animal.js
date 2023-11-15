const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
    name:String,
    age:Number,
    gender: {
        type: String,
        default: 'male'
    },
    storage_time:{
        type:Date
    }
});

exports = module.exports = mongoose.model('animal', AnimalSchema);