export interface CREATE_RESOURCE{
    title:string,
    url:string,
    courseId:string,
    slug:string
}

export interface  update_COURSE{
        id:string
        title:string
        slug:string
        cover:{
            url:string
            fileId:string
        }
        description:string
        price:number
        categoryId:string
        category:{
            name:string,
            id:string
        }
    }

    export interface GET_COURSES_REVIEWS {
        courseId?: string;
        rating?: boolean;
        review?: boolean;
        by?: 'DESC' | 'ASC';
        length?: boolean | number;
        author?: boolean;
        page?: number;
        date?: boolean;
    }

export interface GET_COURSE_BY_SLUG{
    id?:boolean,
    chapters?:boolean,
    reviews?:boolean,
    Saves?:boolean,
    category?:boolean,
    buyed?:boolean,
    resources?:boolean
}
