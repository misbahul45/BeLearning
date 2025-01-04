import { Image } from "./web.types";

export interface CREATE_ARTICLE {
    authorId: string;
    title: string;
    slug: string;
    content: string;
    tags: string[];
    cover:Image
}