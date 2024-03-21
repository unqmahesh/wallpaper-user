import {body, validationResult} from 'express-validator'

const signUpValidators = [

    body('userName')
    .isString().withMessage("user name should be string")
    .notEmpty().withMessage("user name must not be empty"),

    body("userEmail")
    .isEmail().withMessage("Email should be in email format")
    .notEmpty().withMessage("Email should not be empty"),

    body('userPassword')
    .isString().withMessage("password name should be string")
    .notEmpty().withMessage("user password must not be empty")
    .isLength({min : 8}).withMessage("user password must be min of 8 characters length"),
    
    body("userRole")
    .isString().withMessage("user role must be of string")
    .notEmpty().withMessage("user role shouldn't be empty")
    .custom(value => ["user", "admin", "creator", "approver"].includes(value)).withMessage("user role should be one of the role in ['user', 'admin', 'creator', 'approver']")

]

const signUpValidate = async (req, res, next)=>{
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


export {signUpValidators, signUpValidate}