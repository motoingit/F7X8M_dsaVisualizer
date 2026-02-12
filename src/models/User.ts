import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
    password: {
        type: String,
        // Not required if logging in via Google
        required: false,
    },
    email: {
        type: String,
        unique: true,
        sparse: true, // Only unique if exists
    },
    masterPassword: {
        type: String, // As per user request: "masterPassword for all account" - maybe stored per user or specific
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
