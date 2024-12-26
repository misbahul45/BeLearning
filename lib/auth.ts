import NextAuth, { DefaultSession, User as DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcryptjs";

interface User extends DefaultUser {
  id: string;
  role: string;
}

interface Session extends DefaultSession {
  user: {
    id?: string;
    email?: string;
    username?: string;
    image?: string;
    role?: string;
  } & DefaultSession["user"];
}

interface JWT extends DefaultJWT {
  role?: string;
  id?: string;
}

declare module "next-auth" {
  interface User {
    id?: string;
    role: string;
  }
  interface Session {
    user: {
      id?: string;
      email?: string;
      username?: string;
      image?: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email as string },
            include: { profile: true },
          });

          if (!user) {
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials?.password as string,
            user.password as string
          );

          if (!isValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            image: user.profile?.image,
            username: user.username,
            role: user.profile?.role,
          } as User;
        } catch (error) {
          throw new Error("An error occurred during authentication. Please try again.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }): Promise<Session> {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/sign-in",
  },
});
