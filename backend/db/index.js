import mongoose from 'mongoose';
import { config } from 'dotenv';
import { ApiError } from '../utils/ApiError.js';
config()

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
            .then((conn) => {
                console.log("Connection established!", conn.connection.host);
            })
    } catch (error) {
        throw new ApiError(400, "Couldn't connect to server!")
    }
}


export { connectToDb }