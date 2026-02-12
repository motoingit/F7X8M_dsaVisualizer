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
                await connectDB();
                if (!credentials?.username || !credentials?.password) return null;

                const user = await User.findOne({ username: credentials.username });
                if (!user) {
                    return null;
                }

                if (user.password) {
                    // @ts-ignore
                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    if (!isValid) return null;
                    return { id: user._id.toString(), name: user.username, email: user.email };
                }

                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
});
