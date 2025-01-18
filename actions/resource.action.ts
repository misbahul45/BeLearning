'use server'
import prisma from "@/lib/prisma";
import { CREATE_RESOURCE } from "@/types/course.types";
import { revalidatePath } from "next/cache";

export const createResourceAction=async(values:CREATE_RESOURCE)=>{
    try {
        await prisma.resource.create({
            data:{
                title:values.title,
                url:values.url,
                courseId:values.courseId
            }
        })
        revalidatePath(`/course/${values.slug}`);
        return true;
    } catch{
        throw new Error("Failed to create resource");
    }
}

export const deleteResourceAction=async(resourceId:string, slug:string)=>{
    try {
        await prisma.resource.deleteMany({
            where:{id:resourceId}
        })
        revalidatePath(`/course/create/${slug}`);
        return true;
    } catch{
        throw new Error("Failed to delete resource");
    }
}