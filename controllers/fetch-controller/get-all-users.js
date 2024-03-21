import UserModel from "../../schemas/user-schema.js";

const getAllUsers = async (req, res, next) => {
    try{

        const allUsers = await UserModel.find()

    }
    catch(error){
        const err = new Error()
        err.name = error.name || null
        err.message = error.message || null
        err.status = error.status || null
        
        next(err)
    }
}
