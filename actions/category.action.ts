'use server'

import prisma from "@/lib/prisma";

export const getCategoryAction=async({ take, search }:{ take:number, search?:string   })=>{
    try {
        const categories=await prisma.category.findMany({
            where:{
                name:{
                    contains:search,
                    mode:'insensitive'
                }
            },
            take,
            select:{
                id:true,
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
