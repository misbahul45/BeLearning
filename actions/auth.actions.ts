'use server'
import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { LOGIN, REGISTER } from "@/types/auth.types";
import bcrypt from 'bcrypt';
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
                verification:{
                    select:{
                        isVerified:true
                    }
                }
            }
        })

        if(isverifed?.verification?.isVerified) redirect('/browse?category=all');
        const verifyToken=await prisma.verificationToken.update({
            where: {
                token
            },
            data:{
                isVerified:true
            }
        })
        if(!verifyToken) throw new Error('Token not found');

        redirect('/sign-in')
    } catch (error) {
        throw error;
    }
}
export const signinAction = async (value: LOGIN) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: value.email,
            },
            select: {
                email: true,
                password: true,
                verification:{
                    select:{
                        isVerified:true
                    }
                }
            }
        });

        if (!user) throw new Error('User not found');
        if (!user?.verification?.isVerified) {
            redirect('/verify-email');
        }

        const isMatch = await bcrypt.compare(value.password, user.password as string);
        if (!isMatch) throw new Error('Invalid password');

        await signIn('credentials', {
            email: value.email,
            password: value.password,
            redirectTo: '/browse',
        });

    } catch (error) {
        throw error;
    }
};

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
        await prisma.verificationToken.update({
            where: {
                token:token.trim()
            },
            data:{
                isVerified:true
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
       await signIn("google",{
        redirectTo: '/browse'   
       });
    } catch (error) {
        throw error;
    }
}

export const githubsigninAction = async () => {
    try {
       await signIn("github",{
        redirectTo: '/browse'
       });
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