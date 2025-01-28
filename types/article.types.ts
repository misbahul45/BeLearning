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
    parentId?:string;
    slug:string
}

interface ProfileImage {
    url?: string;
}

interface Profile {
    image: ProfileImage;
}

interface User {
    id: string;
    username: string;
    profile?: Profile;
}

export interface Comment {
    user: User;
    userId: string;
    createdAt: Date;
    id: string;
    parentId: string | null;
    message: string;
    children:number
}
