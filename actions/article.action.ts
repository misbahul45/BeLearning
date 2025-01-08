'use server'
import prisma from "@/lib/prisma";
import { CREATE_ARTICLE, GET_ARTICLE } from "@/types/article.types";
import { ARTICLE_VALIDATION } from "@/validations/article.validation";
import { revalidatePath } from "next/cache";

export const createArticleAction = async (values: CREATE_ARTICLE) => {
    try {
        const validatedArticle = ARTICLE_VALIDATION.CREATE.safeParse(values);
        if (!validatedArticle.success) {
            throw new Error("Invalid article details: ");
        }

        const { title, slug, content, tags, authorId } = validatedArticle.data;

        const article = await prisma.article.create({
            data: {
                title,
                slug,
                content,
                authorId: authorId,
                cover:{
                    create:{
                        url:values.cover.url,
                        fileId:values.cover.fileId
                    }
                },
                tags: {
                    create: tags.map(tag => ({
                        tags: {
                            connectOrCreate: {
                                where: { tag },
                                create: { tag },
                            },
                        },
                    })),
                },
            },
        });

        revalidatePath('/dashboard');

        return article;
    } catch (error) {
        throw error;
    }
};


export const getArticlesAction = async (getdata:GET_ARTICLE) => {
    try {
        const articles = await prisma.article.findMany({
            where:{
                status:'PUBLISHED',
                title:{
                    contains:getdata.search || '',
                    mode:'insensitive'
                },
                author:{
                    username:{
                        contains:getdata.search || '',
                        mode:'insensitive'
                    }
                },
            },
            select:{
                id:getdata.id || false,
                title:getdata.title || false,
                slug:getdata.slug || false,
                viewCount:true,
                content:getdata.content || false,
                createdAt:getdata.createdAt || false,
                updatedAt:getdata.updatedAt || false,
                cover:getdata.cover || false,
                author:getdata.author || false,
                tags:{
                    select:{
                        tags:{
                            select:{
                                tag:true                           }
                        }
                    }
                }
            }
        });
        return articles;
    } catch (error) {
        throw error;
    }
};


export const getArticleAction = async (slug:string) => {
    try {
        await prisma.article.update({
            where:{slug},
            data:{viewCount:{increment:1}}
        })
        const article = await prisma.article.findUnique({
            where:{slug},
            include:{
                tags:true,
                cover:true,
                comments:true,
                author:{
                    select:{
                        username:true,
                        profile:{
                            select:{
                                image:true
                            }
                        }
                    }
                },
            }
        });

        return article;
    } catch (error) {
        throw error;
    }
};