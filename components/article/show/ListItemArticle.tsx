import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import BorkmarkPost from './BorkmarkPost';
import LovePost from './LovePost';
import { USER } from '@/types/user.types';

interface Props {
  slug: string;
  cover: string;
  title: string;
  author: string;
  createdAt: Date;
  tags:{
    tags:{
        tag:string
    }
  }[],
  viewCount:number,
  user:Partial<USER>,
  isSaved:boolean
}

const ListItemArticle = ({ slug, cover, title, author, createdAt, tags, viewCount, user, isSaved }: Props) => {
  return (
    <div className="p-4 shadow-lg border border-gray-200 bg-white rounded-lg transform transition duration-300 hover:shadow-xl">
      <Image
        src={cover}
        alt="Article Cover"
        width={200}
        height={200}
        className="object-cover w-full h-48 rounded-t-lg"
      />
      <div className="p-4">
        <h1 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h1>
        <div className="flex justify-between text-gray-600 text-sm mb-3">
          <p>By <span className="font-medium text-gray-700">{author}</span></p>
          <p>{new Date(createdAt).toLocaleDateString('en-US',{
            day:'numeric',
            month:'long',
            year:'numeric'
          })}</p>
        </div>
        <div className="flex flex-col justify-between">
            <div className="flex gap-2 flex-wrap">
                {tags.map((tags, i)=>(
                    <div key={i} className='px-2 py-1 bg-orange-600 text-white rounded font-semibold shadow text-[10px]'>
                        {tags.tags.tag}
                    </div>
                ))}
            </div>
            <p className='text-sm mt-2 font-semibold text-gray-600'>{viewCount} views</p>
             <div className="flex gap-2 items-center mt-3">
              <Link
                href={`/article/${slug}`}
                className="text-center text-white flex-1 bg-primary hover:bg-blue-700 py-1.5 rounded-lg font-medium transition duration-200">
                  Read More
              </Link>
              <BorkmarkPost userId={user?.id || ''} slug={slug} isSaved={isSaved} />
              <LovePost />
             </div>
        </div>
      </div>
    </div>
  );
};

export default ListItemArticle;
