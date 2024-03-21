import {body, validationResult} from 'express-validator'

const signInValidators = [

    body("userEmail")
    .isEmail().withMessage("Email should be in email format")
    .notEmpty().withMessage("Email should not be empty"),

    body('userPassword')
    .isString().withMessage("password name should be string")
    .notEmpty().withMessage("user password must not be empty")
    .isLength({min : 8}).withMessage("user password must be min of 8 characters length"),

]

const signInValidate = async (req, res, next)=>{
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


export {signInValidators, signInValidate}