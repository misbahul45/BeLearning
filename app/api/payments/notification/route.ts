import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const POST=async(req:NextRequest)=>{
    const body=await req.json();
    const transactionStatus=body.transaction_status
    const fraudStatus=body.fraud_status

    const transaction=await prisma.courseBuyedByUser.findUnique({
        where: {
            id:body.order_id
        }
    })

    const hashCheck=crypto.createHash('512').update(transaction?.id+body.status_code+body.gross_amount+process.env.MIDTRANS_SERVER_KEY).digest('hex')

    if(body.signature_key!==hashCheck){
        return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
    }

    if (transactionStatus == 'capture'){
	    if (fraudStatus == 'accept'){
                await prisma.courseBuyedByUser.update({
                    where: {
                        id:body.order_id
                    },
                    data: {
                        isPurchased: true,
                        status: 'PAID'
                    }
                })
                return  NextResponse.json({ message: "Payment success" }, { status: 200 });
            }
        } else if (transactionStatus == 'settlement'){   
            await prisma.courseBuyedByUser.update({
                where: {
                    id:body.order_id
                },
                data: {
                    isPurchased: true,
                    status: 'PAID'
                }
            })
            return  NextResponse.json({ message: "Payment success" }, { status: 200 });
        } else if (transactionStatus == 'cancel' ||
          transactionStatus == 'deny' ||
          transactionStatus == 'expire'){
            return NextResponse.json({ message: "Payment failed, please try again" }, { status: 200 });
        }

}