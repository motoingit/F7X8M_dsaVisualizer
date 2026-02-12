import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
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

                // Allow login if password exists (normal user)
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
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async signIn({ user, account }) {
            try {
                if (account?.provider === "google") {
                    await connectDB();
                    const existingUser = await User.findOne({ email: user.email });
                    if (!existingUser) {
                        try {
                            const newUsername = user.name || user.email?.split('@')[0] || `user_${Date.now()}`;
                            await User.create({
                                email: user.email,
                                username: newUsername,
                            });
                        } catch (e) {
                            console.error("Error creating user:", e);
                            return false;
                        }
                    }
                }
                return true;
            } catch (error) {
                console.error("Sign in callback error:", error);
                return false;
            }
        },
        async session({ session, token }) {
            // @ts-ignore
            if (session.user && token.sub) session.user.id = token.sub;
            return session;
        },
    },
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
});
