import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import Image from 'next/image'
import { Clock1, Star } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { getReviewCoursesAction } from '@/actions/course.action'
import ButtonSaveCourses from './ButtonSaveCourses'
import { getUserAction } from '@/actions/user.action'
import { auth } from '@/lib/auth'
import ShareCourse from './ShareCourse'

interface Props{
    id:string
    title:string
    cover?:{
        url:string
    }
    slug:string
    category:{
        name:string
    }
    author:{
        username:string
        profile:{
            image?:{
                url:string
            }
        } | null
    }
    price:number
    createdAt:Date;
    chaptersLength:number
    
}

const ItemCourse:React.FC<Props> = async({ id,title, cover, slug, category, author, price, createdAt, chaptersLength }) => {
    const { totalReviews, averageRating }=await getReviewCoursesAction({ courseId:id, length:true });
    const session = await auth();
   let user;

   if(session){
    user = await getUserAction(session?.user?.email as string, { id: true });
   }

  return (
    <Card key={title} className="group hover:shadow-lg transition-all duration-200 p-2.5 rounded-lg border-2 hover:border-gray-300">
        <CardHeader className="p-0 relative">
        <div className="relative h-48 w-full">
            <Image
                src={cover?.url || '/api/placeholder/400/300'}
                alt={title}
                width={400}
                height={300}
                className="w-full h-full object-cover rounded-t-lg"
            />
            <div className="absolute top-2 right-2 flex gap-2">
                <ButtonSaveCourses courseId={id} userId={user?.id || null} />
                <ShareCourse />
            </div>
        </div>
        </CardHeader>
        <CardContent className="p-4">
        <div className="flex flex-col gap-2">
            <Link href={`/browse/${slug}`} className="text-sm font-semibold text-gray-500 line-clamp-2 flex-1 hover:text-gray-800 transition-all duration-100">
                {title}
            </Link>
            <div className="flex gap-2">
                <Badge variant="secondary" className="shrink-0 flex-1">
                    {category?.name || 'Uncategorized'}
                </Badge>
                <p className='flex-1 text-xs text-gray-600 flex items-center gap-2 justify-end'>
                    <Clock1 className='size-4' />
                    {chaptersLength} chapters
                </p>
            </div>
        </div>

        <div className='flex justify-between items-center'>
            <div className="mt-3 flex items-center gap-2">
            <Image
                src={author.profile?.image?.url || '/api/placeholder/32/32'} 
                alt={author?.username}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-gray-600">{author?.username || 'Unknown Author'}</span>
            </div>
            <p className='text-xs text-gray-600'>{createdAt.toLocaleDateString('en-US', { day:'numeric', month:'long', year:'numeric' })}</p>
        </div>
        
        <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">{averageRating}</span>
            </div>
            <span className="text-sm text-gray-500">({totalReviews} reviews)</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
            <p className="text-sm font-bold text-gray-600">
            {price>0?price.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }):'Free'}
            </p>
            <Button size={'sm'}>
               enroll
            </Button>
        </div>
        </CardContent>
    </Card>
  )
}

export default ItemCourse
