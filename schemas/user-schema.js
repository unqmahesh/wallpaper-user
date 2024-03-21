import mongoose from 'mongoose'
import crypto from 'crypto'


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
            ref : 'image'}
        ],
    },
    createdImages : {
        type :  [
            {type : mongoose.Schema.Types.ObjectId,
            ref : 'image'}
        ],
    }
}, {timestamps : true})


const UserModel = mongoose.model('User', userSchema)

export default UserModel