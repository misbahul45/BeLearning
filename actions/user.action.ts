'use server';

import prisma from "@/lib/prisma";
import { UPDATE_USER, USER } from "@/types/user.types";

interface getValueUser {
  id?: boolean;
  email?: boolean;
  username?: boolean;
  image?: boolean;
  bio?: boolean;
  role?: boolean;
}

export const getUserAction = async (
  email: string,
  getValue: getValueUser
): Promise<USER | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: getValue.id ?? false,
        username: getValue.username ?? false,
        email: getValue.email ?? false,
        emailVerified: getValue.email ?? false,
        profile: getValue.bio || getValue.image || getValue.role ? {
          select: {
            bio: getValue.bio ?? false,
            image: getValue.image ? {
              select: {
                url: true,
                fileId: true,
              },
            } : false,
            role: getValue.role ?? false,
          },
        } : false,
      },
    });

    if (!user) throw new Error("User not found");

    return {
      ...user,
      profile: user.profile ?? undefined,
    } as USER;
  } catch (error) {
    throw error;
  }
};



export const updateUserAction = async (data: UPDATE_USER) => {
  try {
    const isUser = await prisma.user.count({
      where: {
        email: data.email,
      },
    });

    if (!isUser) throw new Error('User not found');
  

    await prisma.user.update({
      where: {
        email: data.email,
      },
      data: {
        ...(data.username && { username: data.username }),
        profile: {
          update: {
            ...(data.bio && { bio: data.bio }),
            ...(data.image && {
              image: {
                update: {
                   url: data.image.url,
                  fileId: data.image.fileId, 
                },
              },
            }),
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
};
