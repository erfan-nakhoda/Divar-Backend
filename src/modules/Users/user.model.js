const { Schema, model, Types } = require("mongoose");
const otpSchema = new Schema ({
    code : {type : String},
    expiresIn : {type : Number, default : 0}
})
const userModel = new Schema({
    fullName : {type : String},
    number : {type : String, required : true, unique : true},
    otpCode : {type : otpSchema, required : true},
    verifiedNum : {type : Boolean}


}, {timestamps : true})

module.exports = model("user", userModel);