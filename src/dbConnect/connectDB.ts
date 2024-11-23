import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        
         await mongoose.connect(process.env.MONGODB_URI!) ; // typescript requires the ! to tell it that the value is not null or undefined
         const conn = mongoose.connection ;


        conn.on('connected', () => {
             console.log(`MongoDB connected to ${conn.host}`);
        })

        conn.on('error', (err) => {
            console.log(`Error: ${err.message}`);
        })

    } catch (error) {
        
        console.log(error);

    }
}