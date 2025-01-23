import prisma from '@/lib/prisma';
import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Heart, Share2, Star } from 'lucide-react';
import Link from 'next/link';

interface Props{
    search?:string,
    category?:string
}

const ListCourses = async ({ search, category }: Props) => {
  const courses = await prisma.course.findMany({
    where: {
      isPublished: true,
     ...(search && {
        title:{
            contains: search,
            mode:'insensitive'
          },
     }),
      ...(category && {
        category:{
            name: {
              equals: category,
            },
          }
      })
    },
    select: {
      slug:true,
      title: true,
      cover: {
        select: {
          url: true,
        },
      },
      author: {
        select: {
          username: true,
          profile: {
            select: {
              image: {
                select: {
                  url: true,
                },
              },
            },
          },
        },
      },
      price: true,
      category: {
        select: {
          name: true,
        },
      },
      updatedAt: true,
    },
  });




  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {courses.map((course) => (
        <Card key={course.title} className="group hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="p-0 relative">
            <div className="relative h-48 w-full">
              <Image
                src={course?.cover?.url || '/api/placeholder/400/300'}
                alt={course.title}
                width={400}
                height={300}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button className="p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <Link href={`/browse/${course.slug}`} className="text-lg font-semibold text-gray-500 line-clamp-2 flex-1 hover:text-gray-800 transition-all duration-100">
                {course.title}
              </Link>
              <Badge variant="secondary" className="shrink-0">
                {course.category?.name || 'Uncategorized'}
              </Badge>
            </div>

            <div className='flex justify-between items-center'>
                <div className="mt-3 flex items-center gap-2">
                <Image
                    src={course.author.profile?.image?.url || '/api/placeholder/32/32'} 
                    alt={course.author?.username}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                />
                <span className="text-sm text-gray-600">{course.author?.username || 'Unknown Author'}</span>
                </div>
                <p className='text-xs text-gray-300'>{course.updatedAt.toLocaleDateString('en-US', { day:'numeric', month:'long', year:'numeric' })}</p>
            </div>
            
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">4.8</span>
              </div>
              <span className="text-sm text-gray-500">(2.5k reviews)</span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-lg font-bold text-blue-600">
                {course.price.toLocaleString('id-ID', {
                  style: 'currency',
                  currency: 'IDR'
                })}
              </p>
              <Button className="px-6">
                Enroll Now
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ListCourses;
