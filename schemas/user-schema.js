import mongoose from 'mongoose'
import crypto from 'crypto'
import ImageModel from './image-schema.js'

const userSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true,
        default : () => {return crypto.randomUUID()}
    },
    userName : {
        type : String,
        required : true,
    },
    userEmail : {
        type : String,
        required : true,
        unique : true,
    },
    userPassword : {
        type : String,
        required : true,
    },
    userRole : {
        type : String,
        enum : ['user', 'creator', 'approver', 'admin'],
        required : true,
    },
    savedImages : {
        type :  [
            {type : mongoose.Schema.Types.ObjectId,
            ref : 'Image'}
        ],
    },
    createdImages : {
        type :  [
            {type : mongoose.Schema.Types.ObjectId,
            ref : 'Image'}
        ],
    }
}, {timestamps : true})


const UserModel = mongoose.model('User', userSchema)

export default UserModel