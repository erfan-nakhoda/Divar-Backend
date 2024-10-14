const { Schema, Types, model } = require("mongoose");

const categorySchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, index : true, required : true },
    icon: { type: String, required: true },
    parent: { type: Types.ObjectId, ref: "category" , default : undefined},
    parents: { type: [Types.ObjectId], ref: "category", default: [] }
}, {versionKey: false, id: false ,
    toJSON: { virtuals: true}
})
function autopopulate(next) {
    this.populate("children");
    next()
}
categorySchema.pre("find", autopopulate)
categorySchema.virtual("children", {
    ref : "category",
    localField: "parent",
    foreignField: "_id"
});

module.exports = model("category", categorySchema);