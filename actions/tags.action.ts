'use server'

import prisma from "@/lib/prisma"
import { sleep } from "@/lib/utils"
import { GET_DATA_TAGS } from "@/types/tags.types"

export const getTagsAction = async(getData:GET_DATA_TAGS)=>{
    const orderByConditions = [
        getData.by === "ARTICLES" && { articles: { _count: 'desc' } },
        { updatedAt: 'desc' },
      ].filter(Boolean).map((condition) => {
        if (typeof condition === 'object') {
          return condition;
        }
        return {};
      });

    try {
        await sleep();
        const tags=await prisma.tag.findMany({
            select:{
                tag:true,
            },
            take:getData.take,
            orderBy:orderByConditions 
        })
        return tags
    }catch{
        throw new Error('Failed to fetch tags')
    }
} 