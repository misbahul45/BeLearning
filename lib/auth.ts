import NextAuth, { DefaultSession, User as DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

interface User {
  email: string;
  role: string;
}

interface Session extends DefaultSession {
  user: {
    email?: string;
    role?: string;
  } & DefaultSession["user"];
}

interface JWT extends DefaultJWT {
  role?: string;
  email?: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      email?: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email?: string;
    role?: string;
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
            email: user.email,
            role: user.profile?.role,
          } as User;
        } catch (error) {
          throw new Error("An error occurred during authentication. Please try again.");
        }
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
  ],
  callbacks: {    
    async signIn({ account, profile }) {
      if (account?.provider) {
        let user;

        if (account.provider === "google") {
          const email = profile?.email as string;
          const username = profile?.name as string;
          const image =
            profile?.picture as string ||
            "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
          user = await prisma.user.findFirst({
            where: {
              AND: [
                {
                  email,
                },
                {
                  provider: "GOOGLE",
                },
              ],
            },
          });
          if (!user) {
            const password = await bcrypt.hash(email, 10);
            user = await prisma.user.create({
              data: {
                email,
                username: username.replace(/\s+/g, "").toLowerCase(),
                password,
                emailVerified: new Date(),
                provider: "GOOGLE",
                profile: {
                  create: {
                    bio: "",
                    image:{
                      create:{
                        url:image
                      }
                    }
                  },
                },
              },
            });
          }
          return true;
        } else if (account.provider === "github") {
          const email = profile?.email || account?.email || "unknown@github.com";
          const username = profile?.login || "unknown_user";
          const image =
            profile?.avatar_url ||
            "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
          user = await prisma.user.findFirst({
            where: {
              AND: [
                {
                  email: email as string,
                },
                {
                  provider: "GITHUB",
                },
              ],
            },
          });
          if (!user) {
            const password = await bcrypt.hash(email as string, 10);
            user = await prisma.user.create({
              data: {
                email: email as string,
                username : (username as string).replace(/\s+/g, "").toLowerCase(),
                password,
                emailVerified: new Date(),
                provider: "GITHUB",
                profile: {
                  create: {
                    bio: "",
                    image: {
                      create:{
                        url:image as string
                      }
                    }
                  },
                },
              },
            });
          }
          return true;
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
