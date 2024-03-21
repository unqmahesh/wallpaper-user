import {body, validationResult} from 'express-validator'

const imageValidators = [

    body("userId")
    .isString().withMessage("user id must be a string")
    .notEmpty().withMessage("User id must not be empty"),

    body('image_id')
    .isString().withMessage("image id  must be string")
    .notEmpty().withMessage("image id  must not be empty")

]

const imageValidate = async (req, res, next)=>{
    const error = validationResult(req)

    if(!error.isEmpty()){
        const err = new Error()
        err.status = 400,
        err.name = 'validation_error'
        err.message = error.array()
        
        next(err)
    }

    next()
}


export {imageValidators, imageValidate}