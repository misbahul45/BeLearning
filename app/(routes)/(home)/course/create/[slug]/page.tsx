import DialogResource from '@/components/course/create/DialogResources';
import ItemResouce from '@/components/course/create/ItemResouce';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import prisma from '@/lib/prisma';
import { ArrowLeft, Plus, BookOpen, FileText, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

type PageProps = {
  params: {
    slug: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const { slug } = params;
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      cover: true,
      resources: true,
      chapters: true,
    },
  });

  if (!course) {
    redirect('/course/create');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="p-4 w-full max-w-5xl mx-auto">
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
            <form action="">
              <Button
                disabled={course?.chapters.length === 0}
                type="submit"
                variant={course?.isPublished ? 'outline' : 'default'}
                className="min-w-28"
              >
                {course?.isPublished ? 'Unpublish' : 'Publish'}
              </Button>
            </form>
          </div>
          <p className="text-sm text-gray-500">Complete all fields to publish your course</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-3xl font-semibold text-center mb-6">{course?.title}</h2>
          <div className="relative w-full h-[400px] mb-6">
            <Image
              src={course?.cover?.url || ''}
              alt={'image-' + course?.title}
              fill
              className="rounded-lg shadow-lg object-cover"
              priority
            />
          </div>
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: course?.description || '' }} />
          </div>
        </div>

        <Separator className="my-8" />

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="size-5 text-blue-500" />
                Chapters
              </CardTitle>
              <Link href={`/course/create/${slug}/upload`}>
                <Button size="sm" variant="outline" className="gap-2">
                  <Plus className="size-4" />
                  Add Chapter
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {course?.chapters.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <GraduationCap className="size-12 mx-auto mb-2 text-gray-400" />
                  <p>No chapters yet. Start by adding your first chapter!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Add chapter list here */}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resources Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="size-5 text-blue-500" />
                Resources
              </CardTitle>
              <DialogResource courseId={course?.id || ''} slug={course?.slug || ''} />
            </CardHeader>
            <CardContent>
              <div className="space-y-2 border rounded-lg p-4">
                {course?.resources.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="size-12 mx-auto mb-2 text-gray-400" />
                    <p>No resources yet. Add materials to support your course!</p>
                  </div>
                ) : (
                  course?.resources.map((item) => (
                    <ItemResouce
                      key={item.id}
                      id={item.id}
                      title={item.title ?? ''}
                      url={item.url ?? ''}
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