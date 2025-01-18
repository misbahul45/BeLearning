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