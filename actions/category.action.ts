'use server'

import prisma from "@/lib/prisma";

export const showCategoryAction=async()=>{
    try {
        const categories=await prisma.category.findMany({
            select:{
                name:true
            }
        })
        return categories
    } catch{
        throw new Error("Failed to show category");
    }
}
export const createCategoryAction=async(name:string)=>{
    try {
        await prisma.category.create({
            data:{name}
        })
    } catch{
        throw new Error("Failed to create category");
    }
}
