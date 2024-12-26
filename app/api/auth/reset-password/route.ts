import { NextRequest, NextResponse } from "next/server";

import emailjs from '@emailjs/nodejs';
import { generateToken } from '@/lib/utils';
import prisma from '@/lib/prisma';


const envVariables = {
    publicKey:process.env.EMAILjS_PUBLIC_KEY,
    privateKey:process.env.EMAILjS_PRIVATE_KEY,
    serviceId:process.env.EMAILjS_SERVICE2_ID,
    templateId:process.env.EMAILjS_TEMPLATE2_ID,
    appURL:process.env.NEXTAUTH_URL
}

emailjs.init({
    publicKey: envVariables.publicKey,
    privateKey: envVariables.privateKey
});

export async function POST(req:NextRequest) {
    const { email } = await req.json();
    const token=generateToken();

    //save tken in database
    await prisma.verificationToken.create({
        data: {
            token,
            email
        }
    })
    const templateParams = {
        to_email: email,
        token,
        reset_link: new URL('/forgot-password', envVariables.appURL).href + `?token=${token}`+`&show=reset`,
      };
    try {
        await emailjs.send(
          envVariables.serviceId!,
          envVariables.templateId!,
          templateParams
        );
        
        return NextResponse.json(
          { message: 'Email sent successfully!' }, 
          { status: 200 }
        );
      } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
          { message: 'Error sending email' }, 
          { status: 500 }
        );
      }
}