'use server'

import prisma from "@/lib/prisma";

export const getCategoryAction = async () => {
    try {
      const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true
        }
      });
      return categories;
    } catch (error) {
      console.error("Error retrieving categories:", error);
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
