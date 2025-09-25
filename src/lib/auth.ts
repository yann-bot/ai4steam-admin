import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import type {NextAuthOptions, User} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error(
                        JSON.stringify({
                            code: "MISSING_CREDENTIALS",
                            message: "Identifiants manquants",
                        })
                    );
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!user) {
                    throw new Error(
                        JSON.stringify({
                            code: "USER_NOT_FOUND",
                            message: "Utilisateur introuvable",
                        })
                    );
                }





                const isValid =  user.password ? await bcrypt.compare(credentials.password, user.password) : false;

                if (!isValid) {
                    throw new Error(
                        JSON.stringify({
                            code: "INVALID_PASSWORD",
                            message: "Mot de passe incorrect",
                        })
                    );
                }

                // Vérification rôle ADMIN
                if (user.role !== "ADMIN") {
                    throw new Error(
                        JSON.stringify({
                            code: "NOT_ADMIN",
                            message: "Accès réservé aux administrateurs",
                        })
                    );
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as User).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/",
    },
};
