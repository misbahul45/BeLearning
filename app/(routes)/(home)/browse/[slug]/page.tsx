import { getCourseBySlug } from '@/actions/course.action'
import { notFound } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Book, Clock, FileCheck, Globe, Users } from 'lucide-react'
import Backroute from '@/app/article/[slug]/_Component/Backroute'
import { auth } from '@/lib/auth'
import { getUserAction } from '@/actions/user.action'
import Link from 'next/link'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const slug = (await params).slug
  const course = await getCourseBySlug(slug, { id: true })
  return {
    title: `Be learning co, ${course?.title}`,
  }
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const slug = (await params).slug
  const course = await getCourseBySlug(slug, { chapters: true, reviews: true, Saves: true, category: true, buyed: true, resources: true })
  if (!course) {
    return notFound()
  }

  const session = await auth();

    let user;
  
    if(session){
    user = await getUserAction(session?.user?.email as string, { id: true });
   }
   
   const textExp=user?course.CourseBuyedByUser.some((item)=>(item.userId===user?.id) && item.courseId===course.id && item.isPurchased) ? 'Continue learning' : 'Enroll now':'Enroll now'

  return (
    <div className="container mx-auto px-4 py-8">
      <Backroute />
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
          <div className="mb-6">
            <Image
              src={course?.cover?.url || "/placeholder.svg"}
              alt={course.title}
              width={800}
              height={400}
              className="rounded-lg object-cover w-full"
            />
          </div>
          <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: course.description }} />
          
          <Tabs defaultValue="chapters" className="w-full">
            <TabsList>
              <TabsTrigger value="chapters">Chapters</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="chapters">
              <Card>
                <CardContent>
                  {course.chapters.map((chapter, index) => (
                    <div key={chapter.id} className="mb-4">
                      <h3 className="text-lg font-semibold">Chapter {index + 1}: {chapter.title || 'Untitled'}</h3>
                      <p className="text-sm text-gray-600">{chapter.description || 'No description available'}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="resources">
              <Card>
                <CardContent className='space-y-2'>
                    {course.resources.length>0?
                      course.resources.map((item) => (
                        <div key={item.id} className='p-1 border border-gray-200 rounded flex'>
                          <FileCheck className="mr-2 size-5" />
                          <p className="text-sm text-gray-500">{item.title}</p>
                        </div>
                      ))
                      :
                      <p>No resources available</p>
                  }
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <Card>
                <CardContent>
                  {course.CourseReview.length > 0 ? (
                    course.CourseReview.map((review) => (
                      <div key={review.id} className="mb-4">
                        <p className="font-semibold">{}</p>
                        <p className="text-sm text-gray-600">{review.review}</p>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet. Be the first to review this course!</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Globe className="mr-2" />
                  <span>{course.category.name}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2" />
                  <span>{course.CourseBuyedByUser.length} students enrolled</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2" />
                  <span>{course.chapters.length} chapters</span>
                </div>
                <div className="flex items-center">
                  <Book className="mr-2" />
                  <span>{course.resources.length} resources</span>
                </div>
                <Badge variant="secondary" className="mt-2">
                  {course.price === 0 ? 'Free' : `${course.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`}
                </Badge>
                <Link href={textExp === 'Enroll now' ? `/course/enroll/${course.id}` : `/course/learn/${slug}`}>
                  <Button className="w-full mt-4">
                    {textExp}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Page
