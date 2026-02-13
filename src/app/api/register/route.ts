import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const { username, password, masterPassword } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
        }

        const MONGODB_URI = process.env.MONGODB_URI;

        if (!MONGODB_URI) {
            console.error('Missing MONGODB_URI in environment!');
            return NextResponse.json({ message: 'Server Configuration Error' }, { status: 500 });
        }

        console.log(`Attempting registration for: ${username}`);
        await connectDB();
        console.log('DB connected, checking for existing user...');

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('Username already exists');
            return NextResponse.json({ message: 'Username already exists' }, { status: 400 });
        }

        console.log('Valid user, hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Creating new user document...');
        const user = new User({
            username,
            password: hashedPassword,
            masterPassword: masterPassword || undefined // avoid empty string if not provided
        });

        await user.save();
        console.log('User saved successfully');

        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Registration API Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
