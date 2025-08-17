import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('Testing MongoDB connection...');
console.log('MONGO_URI exists:', process.env.MONGO_URI ? 'Yes' : 'No');
console.log('MONGO_URI value:', process.env.MONGO_URI);

async function testConnection() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ MongoDB connected successfully!');
        console.log('Connected to:', conn.connection.host);
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.log('❌ MongoDB connection failed:', error.message);
        process.exit(1);
    }
}

testConnection();