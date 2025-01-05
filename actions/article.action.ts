'use server'
import prisma from "@/lib/prisma";
import { sleep } from "@/lib/utils";
import { CREATE_ARTICLE } from "@/types/article.types";
import { ARTICLE_VALIDATION } from "@/validations/article.validation";
import { revalidatePath } from "next/cache";

export const createArticleAction = async (values: CREATE_ARTICLE) => {
    try {
        // Validasi input artikel
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


export const getAriclesAction = async () => {
    try {
        const articles = await prisma.article.findMany({
            where:{
                status:'PUBLISHED'
            }
        });
        await sleep()
        return articles;
    } catch (error) {
        throw error;
    }
};