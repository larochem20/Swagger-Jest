const mongoose = require("mongoose")
const moongoseDelete = require("mongoose-delete")
const StorageSchema = new mongoose.Schema(
    {
url: {
    type:String,
},
filename: {
    type:String,
}
    },
    {
timestamps:true, //TODO createdAt, updatedAt
versionKey:false

    }
);
StorageSchema.plugin(moongoseDelete, {overrideMethods: "all"});
module.exports = mongoose.model("storage",StorageSchema)