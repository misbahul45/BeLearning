import { auth } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';
import { getUserAction } from '@/actions/user.action';
import toast from 'react-hot-toast';
import { notFound } from 'next/navigation';

const UserInformation = async () => {
  const session = await auth();
  let user;

  try {
    user=await getUserAction(session?.user.email || '', {image: true, bio: true, username: true, email: true});

    if(!user) throw new Error('User not found');
    
  } catch (error) {
   toast.error((error as Error).message);
   return notFound(); 
  }

  return (
    <div className="w-full p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-lg shadow-lg text-white relative">
      <div className="flex  flex-col items-center md:gap-3 gap-2">
        <Image
          src={user?.profile?.image?.url || ''}
          alt="User Profile Picture"
          width={100}
          height={100}
          className="object-cover md:size-24 sm:size-20 size-28 mx-auto rounded-full border-4 border-white shadow-lg"
        />
        <div>
          <h1 className="sm:text-3xl text-2xl font-extrabold">{user?.username || 'Anonymous'}</h1>
          <p className="text-md font-semibold text-gray-300">{user?.email}</p>
        </div>
      </div>
      <p className="mt-6 text-base bg-white text-gray-900 p-4 rounded-lg shadow-inner">
        {user?.profile?.bio || 'This user has not added a bio yet. Start creating your story!'}
      </p>

      <div className="md:absolute sm:top-4 sm:right-4 flex gap-2 md:mt-0 mt-4">
        <Link href={`/profile/edit?email=${user?.email}`} className='w-full'>
          <Button className='font-semibold w-full text-black' variant={'outline'}>
            Edit Profile
          </Button>
        </Link>
        <Button className="font-semibold w-full" variant={'destructive'}>Delete Account</Button>
      </div>
    </div>
  );
};

export default UserInformation;
