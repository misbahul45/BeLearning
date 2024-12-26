'use server'
import { signIn } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { AUTH_TYPES } from "@/types/auth.types";
import { AUTH_VALIDATION } from "@/validations/auth.validation";
import * as bcrypt from 'bcryptjs';
import { redirect } from "next/navigation";

export const signupAction = async (value: AUTH_TYPES.REGISTER) => {
    try {
        const isUserCreated = await prisma.user.count({
            where: {
                email: value.email,
            }
        });

        if (isUserCreated > 0) {
            throw new Error('User already exists, please login');
        }

        value.password = await bcrypt.hash(value.password, 10);

        const user = await prisma.user.create({
            data: {
                username: value.username,
                email: value.email,
                password: value.password,
            },
            select: {
                id: true,
                username: true,
                email: true,
            },
        });

        await prisma.profile.create({
            data: {
                userId: user.id,
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

        const user=await prisma.user.update({
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

export const signinAction = async (value: AUTH_TYPES.LOGIN) => {
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
            redirectTo: '/'
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
            }
        })
        if(!VerifyToken) throw new Error('Token not found');
        await prisma.verificationToken.delete({
            where: {
                token:token.trim()
            }
        })
        return true;
    } catch (error) {
        throw error;
    }
}