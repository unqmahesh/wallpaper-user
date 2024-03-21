import app from './app.js'
import connectDB from './config/db-config.js'


const PORT = process.env.PORT || 5000

const startServer = async() => {
    try{
        await connectDB()
        app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`)})
    }catch(error){
        console.log(error)
    }
}

startServer()