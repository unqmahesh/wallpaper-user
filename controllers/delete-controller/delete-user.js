import UserModel from "../../schemas/user-schema.js";

const deleteUser = async (req, res, next) => {
    try{

        const {userId} = req.body
        
        const userExisted = await UserModel.findOne({userId})

        if(!userExisted){
            const err = new Error()
            err.name = "USER_NOT_FOUND"
            err.message = "unable to find the user"
            err.status = 404

            return next(err)
        }

        const deletedUser = await UserModel.findOneAndDelete({userId}, {new : true})

        deletedUser.userPassword = "********"

        res.status(200).json({success : true, json : deletedUser})

    }
    catch(error){
        const err = new Error()
        err.name = error.name || null
        err.message = error.message || null
        err.status = error.status || null

        next(err)
        
    }
}

export default deleteUser