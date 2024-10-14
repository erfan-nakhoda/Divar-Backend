const {Schema, Types, model} = require('mongoose');

const announceSchema = new Schema({
    title : {type : String, required : true},
    description : {type : String, required : true},
    category : {type : Types.ObjectId, required : true, ref : "category"},
    province : {type : String, required : true},
    city : {type : String, required : true},
    area : {type : String, required : true},
    cordinate : {type : [Number], default : []},
    images : {type : [String], default : []}
})

const announceModel = model('announce', announceSchema);
module.exports = announceModel;