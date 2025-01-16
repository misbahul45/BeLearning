'use server'
import prisma from "@/lib/prisma";
import { CREATE_ARTICLE, GET_ARTICLE } from "@/types/article.types";
import { ARTICLE_VALIDATION } from "@/validations/article.validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
                status:getdata.status=="ALL"?undefined:getdata.status,
                ...(getdata.search &&{title:{
                    contains:getdata.search,
                    mode:'insensitive'
                }}),
                ...(getdata.tag &&{tags:{
                    some:{
                        tags:{
                            tag:getdata.tag
                        }
                    }
                }})

            },
            select:{
                id:getdata.id || false,
                title:getdata.title || false,
                slug:getdata.slug || false,
                viewCount:true,
                status:true,
                content:getdata.content || false,
                createdAt:getdata.createdAt || false,
                updatedAt:getdata.updatedAt || false,
                cover:getdata.cover || false,
                author:getdata.author || false,
                tags:{
                    select:{
                        tags:{
                            select:{
                                tag:true                           
                            }
                        }
                    }
                },
                ...(getdata.save &&{
                    saves:{
                        select:{
                            userId:true
                        }
                    }
                }),
                ...(getdata.like &&{
                    likes:{
                        select:{
                            likedBy:true
                        }
                    }
                })
            },
            take:getdata.take,
            skip:getdata.skip,
            orderBy: {
                ...(getdata.by === 'ASC' && { ['updatedAt']: 'asc' }),
                ...(getdata.by === 'DESC' && { ['updatedAt']: 'desc' }),
                ...(getdata.by === 'COMMENTS' && {  comments: { _count: 'desc' } }),
                ...(getdata.by === 'VIEWS' && { viewCount: 'desc' }),
                ...(getdata.by === 'SAVES' && { saves: { _count: 'desc' } }),
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
                tags:{
                    select:{
                        tags:{
                            select:{
                                tag:true
                            }
                        }
                    }
                },
                cover:{
                    select:{
                        url:true
                    }
                },
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

export const likeArticleAction = async (slug:string, userId:string) => {
    try {
        if(!userId) return redirect('/sign-in');
        
        const article=await prisma.article.findUnique({
            where:{slug},
            select:{id:true}
        })
        if(!article?.id) return false;

        const isLiked=await prisma.articleLike.findUnique({
            where:{
                articleId_likedBy:{
                    articleId:article.id,
                    likedBy:userId
                }
            }
        })

        if(isLiked){
            await prisma.articleLike.delete({
                where:{
                    articleId_likedBy:{
                        articleId:article.id,
                        likedBy:userId
                    }
                }
            })
            revalidatePath('/article');
            return false;
        }else{
            await prisma.articleLike.create({
                data:{  
                    articleId:article.id,
                    likedBy:userId
                }
            })
            revalidatePath('/article');
            return true
        }
    } catch (error) {
        throw error;
    }
}

export const saveArticleAction = async (slug:string, userId:string) => {
    try {
        if(!userId) return redirect('/sign-in');
        const article=await prisma.article.findUnique({
            where:{slug},
            select:{id:true}
        })
        if(!article?.id) return false;

        const isSaved=await prisma.articleSaveByUser.findUnique({
            where:{
                articleId_userId:{
                    articleId:article.id,
                    userId
                }
            }
        })

        if(isSaved){
            await prisma.articleSaveByUser.delete({
                where:{
                    articleId_userId:{
                        articleId:article.id,
                        userId
                    }
                }
            })
            revalidatePath('/article');
            return false;
        }else{
            await prisma.articleSaveByUser.create({
                data:{  
                    articleId:article.id,
                    userId
                }
            })
            revalidatePath('/article');
            return true
        }
    } catch (error) {
        throw error;
    }
}

export const countArticlesAction = async (search?:string, tag?:string) => {
    try {
        const count=await prisma.article.count({
            where:{
                status:'PUBLISHED',
                ...(search &&{title:{
                    contains:search,
                    mode:'insensitive'
                }}),
                ...(tag &&{tags:{
                    some:{
                        tags:{
                            tag:tag
                        }
                    }
                }})
            }
        })
        return count;
    } catch (error) {
        throw error;
    }
}

export const acceptArticleAction=async(slug:string)=>{
    try {
        await prisma.article.update({
            where:{
                slug:slug as string
            },
            data:{
                status:"PUBLISHED"
            }
        })
    } catch{
     console.log("error")
    }
}

export const rejectArticleAction=async(slug:string)=>{
    try {
        await prisma.article.update({
            where:{
                slug:slug as string
            },
            data:{
                status:"REJECT"
            }
        })
    } catch{
     console.log("error")
    }
}

