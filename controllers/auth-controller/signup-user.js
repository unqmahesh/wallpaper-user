import bcrypt from 'bcrypt'

import UserModel from '../../schemas/user-schema.js'

const signUpUser = async (req, res, next) => {
    try{
        const {userName , userEmail, userPassword, userRole} = req.body
        
        const userExisted =  await UserModel.findOne({userEmail})

        if (userExisted){
            const error = new Error("user already existed")
            error.name = "USER_ALREADY_EXISTED"
            error.status = 409
            return next(error)
        }

        const hashedUserPassword = await bcrypt.hash(userPassword, 10)

        const userData = {userName, userEmail, userPassword: hashedUserPassword, userRole, createdImages : []}

        const userInsertedData = await UserModel.create(userData)

        userInsertedData.userPassword = "********"

        res.status(201).json({success : true, data : userInsertedData})
        
    }catch(error){

        const err = new Error()

        err.name = error.name || null
        err.message = error.message || null
        err.status = error.status || null

        next(err)
    }
}

export default signUpUser