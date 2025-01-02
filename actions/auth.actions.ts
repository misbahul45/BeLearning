'use server'
import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { LOGIN, REGISTER } from "@/types/auth.types";
import * as bcrypt from 'bcryptjs';
import { redirect } from "next/navigation";


export const signupAction = async (value: REGISTER) => {
    try {
       
        value.password = await bcrypt.hash(value.password, 10);

        const user = await prisma.user.upsert({
            where: {
              email: value.email
            },
            create: {
              username: value.username,
              email: value.email,
              password: value.password,
              profile: {
                create: {
                  bio: '',
                  image: {
                    create: {
                      url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
                      fileId: ''
                    }
                  }
                }
              }
            },
            update: {
              username: value.username,
              email: value.email,
              password: value.password,
              profile: {
                update: {
                  bio: '',
                  image: {
                    update: {
                      url: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
                      fileId: ''
                    }
                  }
                }
              }
            },
            select: {
              id: true,
              username: true,
              email: true,
            },
          });
          
        if (!user) throw new Error('User not created');

       return user
        
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const checkVerificationToken = async (token: string) => {
    try {
       const VerifyToken=await prisma.verificationToken.findUnique({
        where: {
            token
        }
       })
       if(!VerifyToken) throw new Error('Token not found');

        const isverifed=await prisma.user.findUnique({
            where: {
                email: VerifyToken?.email
            },
            select: {
                emailVerified: true
            }
        })

        if(isverifed?.emailVerified) redirect('/');

        const verifyToken=await prisma.verificationToken.delete({
            where:{
                token
            }
        })

        if(!verifyToken) throw new Error('Token not found');

        await prisma.user.update({
            where: {
                email: VerifyToken?.email
            },
            data: {
             emailVerified: new Date(),   
            },
            select:{
                id:true
            }
        })
        redirect('/sign-in')
    } catch (error) {
        throw error;
    }
}

export const signinAction = async (value: LOGIN) => {
    try {
        const user=await prisma.user.findUnique({
            where:{
                email: value.email
            }
        })

        if(!user) throw new Error('User not found');
        if(!user.emailVerified) {
            redirect('/verify-email')
        }

        const isMatch = await bcrypt.compare(value.password, user.password as string);
        if (!isMatch) throw new Error('Invalid password');

        await signIn('credentials', { 
            email: value.email,
            password: value.password,
            redirectTo: `/browse?category=all`
        });
    } catch (error) {
      throw error;  
    }
}


export const validTokenForResetPassword = async (token: string) => {
    try {
        const VerifyToken=await prisma.verificationToken.findUnique({
            where: {
                token
            },
            select: {
                email: true
            }
        })
        if(!VerifyToken) throw new Error('Token not found');
        await prisma.verificationToken.delete({
            where: {
                token:token.trim()
            }
        })
        return VerifyToken.email;
    } catch (error) {
        throw error;
    }
}

export const updateUserPasswordAction=async(email: string, password: string) => {
    try {
        const isUser=await prisma.user.findUnique({
            where: {
                email
            },
            select:{
                username:true
            }
        })

        if(!isUser) throw new Error('User not found');
        
        password=await bcrypt.hash(password, 10);

        await prisma.user.update({
            where: {
                email
            },
            data: { 
                password
            },
        })
        return isUser.username; 
    } catch (error) {
        throw error;
    }

}

export const googlesigninAction = async () => {
    try {
       await signIn("google");
    } catch (error) {
        throw error;
    }
}

export const githubsigninAction = async () => {
    try {
       await signIn("github");
    } catch (error) {
        throw error;
    }
}


export const signoutAction = async () => {
    try {
       await signOut({
        redirectTo: '/sign-in'
       });
    } catch (error) {
        if(error) throw error;
    }
}