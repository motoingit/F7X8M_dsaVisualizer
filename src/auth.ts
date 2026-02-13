import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    console.log(`Authorizing user: ${credentials?.username}`);
                    await connectDB();
                    console.log('Auth: DB Connected');

                    if (!credentials?.username || !credentials?.password) return null;

                    const user = await User.findOne({ username: credentials.username });
                    if (!user) {
                        console.log('Auth: User not found');
                        return null;
                    }

                    if (user.password) {
                        // @ts-ignore
                        const isValid = await bcrypt.compare(credentials.password, user.password);
                        if (!isValid) {
                            console.log('Auth: Invalid password');
                            return null;
                        }

                        console.log('Auth: Success');
                        return { id: user._id.toString(), name: user.username, email: user.email };
                    }
                    return null;
                } catch (error) {
                    console.error('Auth Error:', error);
                    return null;
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
});
