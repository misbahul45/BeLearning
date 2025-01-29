import DialogResource from '@/components/course/create/DialogResources';
import ItemResource from '@/components/course/create/ItemResouce';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/lib/prisma';
import { ArrowLeft, BookOpen, FileText, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import CreateChapter from '@/components/course/create/CreateChapter';
import ItemChapter from '@/components/course/create/ItemChapter';
import PublishCourse from '@/components/course/create/PublishCourse';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const Page = async ({ params }: PageProps) => {
  const  slug = (await params).slug;

  if (!slug) {
   return redirect('/course/create');
  }

  let course;
  try {
  course = await prisma.course.findUnique({
      where: { 
        slug,
      },
      select: {
        id: true,
        isPublished: true,
        title: true,
        description: true,
        price: true,
        createdAt: true,
        category: { select: { name: true } },
        cover: { select: { url: true } },
        resources: {
          select: { id: true, title: true, url: true },
          orderBy: { createdAt: 'asc' }
        },
        chapters: {
          select: { 
            id: true, 
            title: true,
            description: true,
          },
          orderBy: { createdAt: 'asc' }
        },
      },
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    throw new Error('Failed to fetch course data.');
  }

  if (!course) {
    redirect('/course/create');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="p-4 w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <Link href={`/course/create?update=${slug}`}>
                <button className="hover:bg-gray-100 p-2 rounded-full transition-colors">
                  <ArrowLeft className="text-gray-600" />
                </button>
              </Link>
              <h1 className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 via-violet-600 to-blue-600">
                Course Setup
              </h1>
            </div>
            <PublishCourse
              slug={slug}
              course={{
                chapters: course.chapters.length,
                isPublished: course.isPublished,
              }}
            />
          </div>
          <p className="text-sm text-gray-500">Complete all fields to publish your course</p>
        </div>

        {/* Course Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 space-y-4">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-3xl font-semibold text-center mb-6">{course.title}</h2>
            <div className="flex gap-4">
              <div className="p-2 bg-primary text-blue-200 rounded-full text-xs shadow hover:scale-105 hover:text-white hover:font-semibold transition-all duration-300">
                {course.category.name}
              </div>
              <div className="p-2 bg-orange-500 text-orange-200 rounded-full text-xs shadow hover:scale-105 hover:text-white hover:font-semibold transition-all duration-300">
                {course.price === 0
                  ? 'Free'
                  : course.price.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
              </div>
            </div>
          </div>

          <div className="relative w-full h-[400px]">
            <Image
              src={course.cover?.url || ''}
              alt={`image-${course.title}`}
              fill
              className="rounded-lg shadow-lg object-cover"
              priority
            />
          </div>
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: course.description || '' }} />
          </div>
        </div>

        <Separator className="my-8" />

        {/* Chapters and Resources */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="size-5 text-blue-500" />
                Chapters
              </CardTitle>
              <CreateChapter courseId={course.id} slug={slug} />
            </CardHeader>
            <CardContent>
              {course.chapters.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <GraduationCap className="size-12 mx-auto mb-2 text-gray-400" />
                  <p>No chapters yet. Start by adding your first chapter!</p>
                </div>
              ) : (
                <div className="space-y-2 border max-h-56 overflow-auto [scrollbar-width:thin] rounded-lg p-2">
                  {course.chapters.map((item) => (
                    <ItemChapter key={item.id} slug={slug} id={item.id} title={item.title || ''} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-5 text-blue-500" />
                Resources
              </CardTitle>
              <DialogResource courseId={course.id} slug={slug} />
            </CardHeader>
            <CardContent>
              <div className="space-y-2 border rounded-lg p-2">
                {course.resources.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="size-12 mx-auto mb-2 text-gray-400" />
                    <p>No resources yet. Add materials to support your course!</p>
                  </div>
                ) : (
                  course.resources.map((item) => (
                    <ItemResource
                      key={item.id}
                      id={item.id}
                      title={item.title ?? ''}
                      url={item.url ?? ''}
                      courseSlug={slug}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
