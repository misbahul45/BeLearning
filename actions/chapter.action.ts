'use server'
import prisma from "@/lib/prisma"
import { CHAPTER } from "@/validations/course.validation"
import { revalidatePath } from "next/cache"

export const createChapterAction = async (courseId: string, slug: string) => {
    try {
    
        const chapter = await prisma.chapter.create({
            data: {
                courseId
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
export const updateChapterAction = async (slug: string,chapterId: string, values:CHAPTER,) => {
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
