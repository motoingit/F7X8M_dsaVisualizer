import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// @ts-ignore
let cached = global.mongoose;

if (!cached) {
    // @ts-ignore
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        console.log('Using cached MongoDB connection');
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        console.log('Connecting to MongoDB...');

        // Add robust connection options
        const connectionOptions = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging
            socketTimeoutMS: 45000,
        };

        cached.promise = mongoose.connect(MONGODB_URI!, connectionOptions).then((mongoose) => {
            console.log('MongoDB connected successfully');
            return mongoose;
        }).catch((err) => {
            console.error('MongoDB connection error details:', err);
            cached.promise = null; // Reset promise so we can try again
            throw err;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error('MongoDB connection error:', e);
        throw e;
    }

    return cached.conn;
}

export default connectDB;
