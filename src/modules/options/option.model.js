const { Schema, Types , model} = require("mongoose");

const OptionSchema = new Schema({
    title: { type: String, required: true },
    key: { type: String, required: true },
    type: { type: String, enum: ["number", "string", "array", "boolean"], required: true },
    selection: { type: [String], default : []},
    required : {type : Boolean},
    guide : {type : String},
    category: { type: Types.ObjectId, required: true, ref: "category" }
})

const OptionModel = model("option", OptionSchema);
module.exports= OptionModel;