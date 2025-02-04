import { getUserAction } from '@/actions/user.action'
import MidtransPayment from '@/components/course/enroll/MidtransPayment'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@/lib/auth'
import { fetchTransactionToken } from '@/lib/payment'
import prisma from '@/lib/prisma'
import { BookOpen } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

type PageProps={
    params:Promise<{courseId:string}>
}

const page:React.FC<PageProps> = async({ params }) => {
  try {
    const courseId=(await params).courseId
    const session=await auth()
    const user=await getUserAction(session?.user.email as string,{id:true, username:true})
    const course=await prisma.course.findUnique({
      where:{id:courseId},
      select:{
        price:true,
        cover:{
          select:{
            url:true,
          }
        },
        title:true
      }
    })

    if(!course){
      throw new Error("Course not found");
    }

    const EnrollUser = await prisma.courseBuyedByUser.upsert({
      where: {
        userId_courseId: {
          userId: user?.id as string,
          courseId,
        },
      },
      create: {
        courseId,
        userId: user?.id as string,
      },
      update: {
        isPurchased:course.price===0?true:false
      },
      select:{
        id:true,
        isPurchased:true,
        course:{
          select:{
            price:true,
            slug:true
          }
        }
      }
    });

    if(EnrollUser.isPurchased){
      redirect('/course/learn/'+EnrollUser.course.slug)
    }

    const transactionToken=await fetchTransactionToken(`${process.env.NEXT_APPLICATION_URL as string}/api/payments`,{
      name:user?.username as string,
      email:session?.user.email as string,
      enrollId:EnrollUser.id,
      price:course.price
    });

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden bg-white shadow-xl">
            <div className="relative w-full h-[300px]">
              {course?.cover?.url ? (
                <Image
                  src={course.cover.url}
                  alt={course.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
  
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {course?.title}
                </CardTitle>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-primary">
                    {course?.price === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      <span>{course?.price.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      })}</span>
                    )}
                  </span>
                  <MidtransPayment transactionToken={transactionToken} />
                </div>
              </div>
            </CardHeader>
  
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Course Features
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Full lifetime access
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Access on mobile and desktop
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Certificate of completion
                    </li>
                  </ul>
                </div>
  
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    What You&apos;ll Get
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-gray-700">
                      <BookOpen className="w-5 h-5 text-primary" />
                      High-quality video content
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <BookOpen className="w-5 h-5 text-primary" />
                      Downloadable resources
                    </li>
                    <li className="flex items-center gap-2 text-gray-700">
                      <BookOpen className="w-5 h-5 text-primary" />
                      24/7 community support
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (e){
    console.log(e)
  }
}

export default page
