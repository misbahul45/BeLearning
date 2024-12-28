import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

const UserInformation = async () => {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
    select: {
      username: true,
      email: true,
      profile: {
        select: {
          image: true,
          bio: true,
        },
      },
    },
  });

  return (
    <div className="w-full p-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-lg shadow-lg text-white relative">
      <div className="flex items-center gap-6">
        <Image
          src={user?.profile?.image || '/default-avatar.png'}
          alt="User Profile Picture"
          width={100}
          height={100}
          className="object-cover w-24 h-24 rounded-full border-4 border-white shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-extrabold">{user?.username || 'Anonymous'}</h1>
          <p className="text-base text-gray-300">{user?.email}</p>
        </div>
      </div>
      <p className="mt-6 text-base bg-white text-gray-900 p-4 rounded-lg shadow-inner">
        {user?.profile?.bio || 'This user has not added a bio yet. Start creating your story!'}
      </p>

      <div className="absolute top-4 right-4 flex gap-2">
        <Link href={`/profile/edit?email=${user?.email}`}>
          <Button className="font-semibold text-black" variant={'outline'} >
            Edit Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UserInformation;
