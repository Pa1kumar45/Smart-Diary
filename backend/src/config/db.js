import mongoose from "mongoose";

// export async function connectDB() {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//             serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
//             socketTimeoutMS: 45000,
//         });
//         console.log(`MongoDB connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error("Error connecting to MONGODB", error);
//         process.exit(1);
//     }
// }
export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB connected successfully");
    }
    catch(error){
    console.error("Error conneting to MONGODB", error);
    process.exit(1);  // exit with failure
    }
};