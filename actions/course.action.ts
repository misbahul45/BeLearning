'use server'
import prisma from "@/lib/prisma";
import { update_COURSE } from "@/types/course.types";
import { CREATE_COURSE } from "@/validations/course.validation";
import { revalidatePath } from "next/cache";

export const createCourseAction=async(authorId:string,values:CREATE_COURSE)=>{
    try {
        const course=await prisma.course.create({
            data:{
                title:values.title,
                slug:values.slug,
                cover:{
                    create:{
                        url:values.cover.url,
                        fileId:values.cover.fileId
                    }
                },
                description:values.description,
                price:values.price,
                categoryId:values.categoryId,
                authorId
            },
            select:{
                slug:true
            }
        })
        return {
            slug:course.slug
        };
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create course");
    }
}

export const getCourseBySlug=async(slug:string)=>{
    try {
        const course=await prisma.course.findUnique({
            where:{slug:slug as string},
            include:{
                cover:true,
                category:true
            }
        })
        return course;
    }catch{
        throw new Error("Failed to get course");
    }
}

export const updateCourseAction=async(slug:string,values:update_COURSE)=>{
    try {
        const course=await prisma.course.update({
            where:{slug:slug as string},
            data:{
                title:values.title,
                slug:values.slug,
                price:values.price,
                description:values.description,
                categoryId:values.categoryId,
                cover:{
                    update:{
                        url:values.cover?.url,
                        fileId:values.cover?.fileId
                    }
                },
            },
            select:{
                slug:true
            }
        })
        return {
            slug:course.slug
        };
        
    } catch {
        throw new Error("Failed to update course");
    }
}

export const publishCourseAction = async (slug: string, isPublished: boolean) => {
    try {
      const course = isPublished?await prisma.course.update({
        where: { slug },
        data: { isPublished: true },
        select: {
            isPublished: true
        }
      }):await prisma.course.update({
        where: { slug },
        data: { isPublished: false },
        select: {
            isPublished: true
        }
      })
      if(!course) throw new Error("Failed to publish course");
      revalidatePath(`/course/create/${slug}`);
      return course;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to publish course: ${(error as Error).message}`);
    }
  };