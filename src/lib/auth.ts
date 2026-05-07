import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email or Phone", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: credentials.email },
                            { phone: credentials.email }
                        ]
                    },
                    include: { profile: true }
                });

                if (!user) return null;

                const passwordMatch = await bcrypt.compare(credentials.password, user.passwordHash);
                if (!passwordMatch) return null;

                return {
                    id: user.id,
                    email: user.email,
                    role: user.profile?.role || "customer",
                    name: user.profile?.fullName || "",
                };
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            // Include ID and role in JWT token
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            // Forward ID and role from JWT to Client Session object
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET || "madurai-fallback-secret-for-dev",
};
