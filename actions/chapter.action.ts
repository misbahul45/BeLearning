'use server'
import prisma from "@/lib/prisma"
import { CHAPTER } from "@/validations/course.validation"
import { revalidatePath } from "next/cache"

export const createChapterAction = async (courseId: string, slug: string) => {
    try {
    
        const chapter = await prisma.chapter.create({
            data: {
                courseId,
            },
            select: {
                id: true
            }
        })
        if (!chapter || !chapter.id || !slug) {
            throw new Error("Invalid data for redirect")
        }
        return chapter.id;
        
    } catch (e){
        throw e;
    }
}


export const deleteChapterAction = async (chapterId: string, slug: string) => {
    try {
        await prisma.$transaction([
            prisma.video.deleteMany({
                where:{
                    chapterId
                }
            }),
            prisma.chapter.delete({
                where:{
                    id:chapterId
                }
            })
        ])
        revalidatePath(`/course/create/${slug}`);
        return true;
    } catch(e){
        console.log(e);
      throw new Error("Failed to delete chapter");
    }
}
export const updateChapterAction = async (slug: string,chapterId: string, values:CHAPTER) => {
    try {
        await prisma.chapter.update({
            where:{
                id:chapterId
            },
            data:{
                ...(values.title && {title:values.title}),
                ...(values.description && {description:values.description}),
                ...(values.video?.url && {
                    video: {
                        upsert:{
                            create: {
                                name:values.video.name,
                                url: values.video.url || "",
                                ...(values.video.fileId && {fileId:values.video.fileId})
                            },
                            update: {
                                name:values.video.name,
                                url: values.video.url || "",
                                fileId:values.video.fileId
                            }
                        }
                    }
                })
            }
        })
        revalidatePath(`/course/create/${slug}`);
    } catch{
        throw new Error("Failed to update chapter");
    }
}


export const getUnlockChapterAction = async (id: string) => {
    try {
        const chapters = await prisma.chapter.findUnique({
            where: {
                id 
            },
            select: {
                isUnlocked: true
            }
        })
        return chapters;
    } catch{
        throw new Error("Failed to get unlock chapter");
    }
}

export const toggleChapterLockAction = async (id: string) => {
    try {
        // Dapatkan status saat ini dari chapter
        const chapter = await prisma.chapter.findUnique({
            where: { id },
            select: { isUnlocked: true }
        });

        if (!chapter) {
            throw new Error("Chapter not found");
        }

        // Toggle status isUnlocked
        const updatedChapter = await prisma.chapter.update({
            where: { id },
            data: { isUnlocked: !chapter.isUnlocked },
            select: { isUnlocked: true }
        });

        return updatedChapter;
    } catch{
        throw new Error("Failed to toggle chapter lock");
    }
};
