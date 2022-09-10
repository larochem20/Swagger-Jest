const mongoose = require("mongoose")
const moongoseDelete = require ("moongose-delete")
const UserSchema = new mongoose.Schema(
    {
name: {
    type:String
},
age: {
    type:Number
},
email: {
    type:String,
    unique:true
},
password: {
    type:String,
    select: false
},
role: {
    type:["user","admin"],
    default: "user",
}
    },
    {
timestamps:true, //TODO createdAt, updatedAt
versionKey:false

    }
)
UserSchema.plugin(moongoseDelete, {overrideMethods: "all"});
module.exports = mongoose.model("users",UserSchema)