import UserModel from "../../schemas/user-schema.js";

const addCreatedImages = async (req, res, next) => {
    try{

        const {userId, image_id} = req.body

        
        const userExisted = await UserModel.findOne({userId})

        if(!userExisted)
        {
            const err = new Error()
            err.name = "USER_NOT_FOUND"
            err.message = "unable to find the user"
            err.status = 404
            throw err
        }


        const imageExisted = userExisted.createdImages.some(createdImage => createdImage.equals(image_id))

        if(imageExisted)
        {
            const err = new Error()
            err.name = "IMAGE_ALREADY_EXISTED"
            err.message = "image already existed"
            err.status = 409
            throw err    
        }

        const updatedData = await UserModel.findOneAndUpdate(
            {userId},
            {$push : {createdImages : image_id}},
            {new : true} )


        res.status(201).json({success : true, data : updatedData})

    }
    catch(error)
    {
        const err = new Error()
        err.name = error.name || "ADD_IMAGE_FAILED"
        err.message = error.message || "Unable to add the image"
        err.status = error.status || 500

        next (err)
    }
}

const removeCreatedImages = async (req, res, next) => {
    try{

        const {userId, image_id} = req.body

        const userExisted = await UserModel.findOne({userId})

        if(!userExisted)
        {
            const err = new Error()
            err.name = "USER_NOT_FOUND"
            err.message = "unable to find the user"
            err.status = 404
            throw err
        }

        const imageExisted = userExisted.createdImages.some(createdImage => createdImage.equals(image_id))

        if(!imageExisted)
        {
            const err = new Error()
            err.name = "IMAGE_NOT_FOUND"
            err.message = "image not found"
            err.status = 409
            throw err    
        }

        const updatedData = await UserModel.findOneAndUpdate(
            {userId},
            {$pull : {createdImages : image_id}},
            {new : true} )


        res.status(201).json({success : true, data : updatedData})

    }
    catch(error)
    {
        const err = new Error()
        err.name = error.name || "REMOVE_IMAGE_FAILED"
        err.message = error.message || "Unable to remove the image"
        err.status = error.status || 500

        next (err)
    }
}


export {addCreatedImages, removeCreatedImages}