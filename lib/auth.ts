import NextAuth, { DefaultSession, User as DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"

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
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string
    })
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
    async signIn({ account, profile }) {
      if (account?.provider) {
        const email = profile?.email as string;
        const username = profile?.name || `user${Date.now()}`;
        const image = profile?.picture || 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png';

        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          const password = await bcrypt.hash(email, 10);
          user = await prisma.user.create({
            data: {
              email,
              username: username.replace(/\s+/g, "").toLowerCase(),
              password,
              emailVerified: new Date(),
              profile: {
                create: {
                  bio: "",
                  image,
                },
              },
            },
          });
        }

        return true;
      }
      return false;
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
