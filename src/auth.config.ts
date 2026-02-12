import type { NextAuthConfig } from 'next-auth';

// This file must NOT import anything that requires Node.js runtime (like bcrypt, mongoose)
export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/login',
    },
    session: { strategy: 'jwt' },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user && token.id) {
                // @ts-ignore
                session.user.id = token.id as string;
            }
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            return true;
        }
    },
    providers: [],
};
