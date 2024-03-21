import bcrypt from 'bcrypt'

import UserModel from '../../schemas/user-schema.js'

const signInUser = async (req, res, next) => {
    try{

        const {userEmail, userPassword} = req.body

        const userExisted = await UserModel.findOne({userEmail})

        if(!userExisted){
            const err = new Error("user not found")
            err.name = "user_not_found"
            err.status= 404
            return next(err)
        }

        const hashedUserPassword = userExisted.userPassword

        const validPassword = await bcrypt.compare(userPassword, hashedUserPassword)

        if(!validPassword){
            const err = new Error("user unauthorized due to incorrect password")
            err.name = "incorrect_password"
            err.status = 401
            return next(err)
        }

        userExisted.userPassword = "********"

        res.status(200).json({success : true, data : userExisted})
    }
    catch(error)
    {
        const err = new Error()
        err.message = error.message || null
        err.name = error.name || null
        err.status = error.status || null
        next(err)
    }
}

export default signInUser