const mongoose = require("mongoose")
const moongoseDelete =require('moongose-delete')
const TracksSchema = new mongoose.Schema(
    {
name: {
    type:String,
},
album: {
    type:String,
},
cover: {
    type:String,
    validate:{
        validator:(req) => {
            return  true;
        },
        message: "EROR_URL",

    },
},
artist: {
    name: {
type: String,
    },
   nickname: {
    type: String,
   },
   nationality: {
    type: String,
   },
},
duration: {
 start: {
    type: Number,
 },
 end: {
    type: Number,
 },
},
mediaId: {
    type: mongoose.Types.ObjectId,
},
    },
    {
timestamps:false, //TODO createdAt, updatedAt
versionKey:true

    }
)
/**
 * implementar meotodo propio con relacion a storage
 */
 TracksScheme.statics.findAllData = function () {
    const joinData = this.aggregate([
        {
            $lookup:{
                from: 'storages',
                localField: "mediaId",
                foreignField: "_id",
                as: "audio",
            },
    
        },
        {
            $unwind:"$audio"
        }
        
    ])
    return joinData
 };
 TracksScheme.statics.findOneData = function (id) {
    const joinData = this.aggregate([
        {
            $lookup:{
                from: 'storages',
                localField: "mediaId",
                foreignField: "_id",
                as: "audio",
            },
    
        },
        {
            $unwind:"$audio"
        },
        {
            $match: {
                _id:moongose.Types.ObjectId(id)
            }
        }
        
    ])
    return joinData
 };
TracksScheme.plugin(moongoseDelete, {overrideMethods: "all"});
module.exports = mongoose.model("tracks",TracksScheme)