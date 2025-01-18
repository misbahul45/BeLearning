import { z } from "zod";

export class COURSE_VALIDATION{
    static readonly CREATE=z.object({
        title:z.string({required_error:"Title is required"}).min(5,{message:"Title must be at least 5 characters"}).max(100),
        slug:z.string({required_error:"Slug is required"}).min(5,{message:"Slug must be at least 5 characters"}).max(100),
        description:z.string().min(5),
        cover:z.object({
            url:z.string().url(),
            fileId:z.string({required_error:"File id is required"})
        }),
        price:z.number({required_error:"Price is required"}),
        categoryId:z.string()
    })
    static readonly RESOURCE=z.object({
        title:z.string().min(5).max(100),
        link:z.string().url()
    })
}

export type CREATE_COURSE=z.infer<typeof COURSE_VALIDATION.CREATE>
export type RESOURCE=z.infer<typeof COURSE_VALIDATION.RESOURCE>