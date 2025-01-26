'use server'

import prisma from "@/lib/prisma";
import { CREATE_COMMENT_ARTICLE } from "@/types/article.types";

export const createArticleCommentAction=async(values:CREATE_COMMENT_ARTICLE)=>{
    try {
        if(!values.message) return null;
        await prisma.articleComments.create({
            data:{
                message:values.message,
                userId:values.userId,
                articleId:values.articleId,
                ...(values.parentId && {parentId:values.parentId})
            }
        })
    } catch{
        throw new Error("Failed to create comment");
    }
}
export const getArticleCommentsAction = async (
    articleId: string, 
) => {
    if (!articleId) {
        throw new Error('Article ID is required');
    }

    try {
        const baseCommentSelect = {
            user: {
                select: {
                    id: true,
                    username: true,
                    profile: {
                        select: {
                            image: {
                                select: { url: true },
                            },
                        },
                    },
                },
            },
            userId: true,
            createdAt: true,
            id: true,
            parentId: true,
            message: true,
        };

        const comments = await prisma.articleComments.findMany({
            where: {
                articleId,
            },
            select: baseCommentSelect,
            orderBy: { createdAt: "desc" },
        });

        const sendBackComment=comments.filter((c)=>c.parentId===null);
        return sendBackComment;

    } catch (error) {
        console.error('Error fetching comments:', error);
        throw new Error(`Failed to retrieve comments: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};


export const getSubCommentsAction = async (parentId: string) => {
    try {
        const baseCommentSelect = {
            user: {
                select: {
                    id: true,
                    username: true,
                    profile: {
                        select: {
                            image: {
                                select: { url: true },
                            },
                        },
                    },
                },
            },
            userId: true,
            createdAt: true,
            id: true,
            parentId: true,
            message: true,
        };

        const comments = await prisma.articleComments.findMany({
            where: {
               parentId
            },
            select: baseCommentSelect,
            orderBy: { createdAt: "desc" },
        });

        return comments;

    } catch (error) {
        console.error('Error fetching comments:', error);
        throw new Error(`Failed to retrieve comments: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
