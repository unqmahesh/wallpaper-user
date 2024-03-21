import mongoose from 'mongoose'

const connectDB = async () => {

    const MONGODB_URI = process.env.MONGODB_URI

    try{
        await mongoose.connect(MONGODB_URI)
        console.log("connected to Database")
    }
    catch(error){
        console.log("Unable to conect to database")
        process.exit(1)
    }
}


export default connectDB