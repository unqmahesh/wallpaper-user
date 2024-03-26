import express from 'express'

const indexRouter = express.Router()

import signInUser from '../controllers/auth-controller/signin-user.js'
import signUpUser from '../controllers/auth-controller/signup-user.js'
import deleteUser from '../controllers/delete-controller/delete-user.js'
import getUser from '../controllers/fetch-controller/get-user.js'
import { addSavedImage, removeSavedImage } from '../controllers/update-controller/update-saved-images.js'
import { addCreatedImages, removeCreatedImages } from '../controllers/update-controller/update-created-images.js'
import updateUserProfile from '../controllers/update-controller/update-user-profile.js'


import { signInValidators, signInValidate } from '../middlewares/validations/signin-validation.js'
import { signUpValidators, signUpValidate } from '../middlewares/validations/signup-validation.js'
import { imageValidators, imageValidate } from '../middlewares/validations/image-validation.js'

indexRouter.route('/signin').post(signInValidators, signInValidate, signInUser)
indexRouter.route('/signup').post(signUpValidators, signUpValidate, signUpUser)
indexRouter.route('/get-user').post(getUser)
indexRouter.route('/delete').post(deleteUser)
indexRouter.route('/add-saved-img').post(imageValidators, imageValidate, addSavedImage)
indexRouter.route('/remove-saved-img').post(imageValidators, imageValidate, removeSavedImage)
indexRouter.route('/add-created-img').post(imageValidators, imageValidate, addCreatedImages)
indexRouter.route('/remove-created-img').post(imageValidators, imageValidate, removeCreatedImages)
indexRouter.route('/update-profile').post(updateUserProfile)


export default indexRouter