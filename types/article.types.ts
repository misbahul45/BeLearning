import { Image } from "./web.types";

export interface CREATE_ARTICLE {
    authorId: string;
    title: string;
    slug: string;
    content: string;
    tags: string[];
    cover:Image
}


export interface GET_ARTICLE {
    id?:boolean; 
    status?:'DRAFT' | 'PUBLISHED' | 'APPROVED' | "ALL";
    slug?:boolean;
    title?:boolean;
    content?:boolean;
    author?:boolean;
    cover?:boolean;
    tags?:boolean;
    createdAt?:boolean;
    updatedAt?:boolean;
    search?:string;
    save?:boolean;
    like?:boolean;
    take?:number;
    skip?:number;
    tag?:string;
    by?:'ASC' | 'DESC'|'COMMENTS' | 'VIEWS' | 'SAVES';
}

export interface CREATE_COMMENT_ARTICLE {
    message: string;
    userId: string;
    articleId: string;
}

export interface COMMENT{
    message?:string;
    articleId?:string;
    userId?:string;
    parentId?:string | null;
    createdAt: Date;
}