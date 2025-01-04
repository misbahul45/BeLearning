import { z } from "zod";

export class ARTICLE_VALIDATION {
    static readonly CREATE=z.object({
        authorId:z.string(),
        title:z.string().min(5).max(100),
        slug:z.string().min(5).max(100),
        content:z.string().min(5),
        tags:z.array(z.string()),
        cover:z.object({
            url:z.string(),
            fileId:z.string()
        })
    })
}