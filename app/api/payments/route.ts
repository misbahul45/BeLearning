import { NextRequest, NextResponse } from "next/server";
import midtransClient from 'midtrans-client';
import prisma from "@/lib/prisma";

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: MIDTRANS_SERVER_KEY
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    if (!body.enrollId || !body.price || !body.name || !body.email) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const payload = {
      transaction_details: {
        order_id: body.enrollId,
        gross_amount: Number(body.price) 
      },
      credit_card: {
        secure: true
      },
      customer_details: {
        first_name: body.name,
        email: body.email,
      },
      callbacks: {
        finish: `${process.env.NEXT_APPLICATION_URL}/course/enroll/67894693dccb349b0219caae?enrollId=${body.enrollId}`,
        error: `${process.env.NEXT_APPLICATION_URL}/course/enroll/67894693dccb349b0219caae?enrollId=${body.enrollId}`,
        pending: `${process.env.NEXT_APPLICATION_URL}/course/enroll/67894693dccb349b0219caae?enrollId=${body.enrollId}`
      }
    };


    const transaction = await snap.createTransaction(payload);

    if (!transaction || typeof transaction !== 'object' || !('token' in transaction)) {
      throw new Error("Failed to retrieve transaction token");
    }

    await prisma.courseBuyedByUser.update({
      where:{
        id:body.enrollId
      },
      data:{
        snap_token:transaction.token
      }
    })

    return NextResponse.json({
      message: 'Transaction created successfully',
      data: {
        token: transaction.token
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: (error as Error).message }, { status: 500 });
  }
};
