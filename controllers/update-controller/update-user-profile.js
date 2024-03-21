import UserModel from "../../schemas/user-schema.js";
import bcrypt from 'bcrypt'

const updateUserProfile = async(req, res, next) => {

    try{

        const {userName , userPassword, userRole, userId} = req.body

        const userExisted = await UserModel.findOne({userId})

        if(!userExisted){
            const err = new Error()
            err.name = 'USER_NOT_FOUND'
            err.message = "unable to find the user"
            err.status = 409

            next(err)
        }

        const newData = {
            userName : userName || userExisted.userName,
            userRole : userRole || userExisted.userRole,
            userPassword : userPassword ? await bcrypt.hash(userPassword, 10) : userExisted.userPassword
        }
    
        const updatedData = await UserModel.findOneAndUpdate({userId}, newData, {new:true})

        res.status(200).json({success : true, data : updatedData})
    }
    catch(error){
        const err = new Error()
        err.name = error.name || null
        err.message = error.message || null
        err.status = error.status || null

        next(err)
    }
}

export default updateUserProfile