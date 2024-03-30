import mongoose from "mongoose";
import crypto from 'crypto'

const imageResolutionSchema = new mongoose.Schema({
    publicId : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    },
    height : {
        type : Number,
        required : true
    },
    width : {
        type : Number,
        required : true
    },
    saves : {
        type : Number,
        required : true,
        default  : 0
    }
}, {timestamps : true})

const imageSchema = new mongoose.Schema({
    imageId : {
        type : String ,
        default : () => {return crypto.randomUUID()}
    },
    aspectRatio : {
        type : String,
        required : true
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'UserModel',
        required : true
    },
    imageResolutions : {
        type : [imageResolutionSchema],
        required : true
    },
    keyWords : {
        type : Array,
        required : true
    }
})


const ImageModel = mongoose.model("Image", imageSchema)

export default ImageModel