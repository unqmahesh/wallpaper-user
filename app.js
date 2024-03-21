import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import errorHandler from './middlewares/err-handler.js'
import indexRouter from './router/index-router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/user/api/v1',indexRouter)

app.use(errorHandler)

export default app