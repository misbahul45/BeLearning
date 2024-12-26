import { NextRequest, NextResponse } from 'next/server';
import emailjs from '@emailjs/nodejs';
import { generateToken } from '@/lib/utils';
import prisma from '@/lib/prisma';


const envVariables = {
    publicKey:process.env.EMAILjS_PUBLIC_KEY,
    privateKey:process.env.EMAILjS_PRIVATE_KEY,
    serviceId:process.env.EMAILjS_SERVICE_ID,
    templateId:process.env.EMAILjS_TEMPLATE_ID,
    appURL:process.env.NEXTAUTH_URL
}

emailjs.init({
    publicKey: envVariables.publicKey,
    privateKey: envVariables.privateKey
});

export async function POST(req: NextRequest) {
  const { to } = await req.json();
  const token=generateToken();

  //save tken in database
  await prisma.verificationToken.create({
    data:{
        token:token,
        email:to
    }
  })

  const verificationLink = new URL('/verify-email', envVariables.appURL).href + `?token=${token}`;
  const templateParams = {
    to_email: to,
    token,
    verification_link: verificationLink,
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