'use server'
import prisma from "@/lib/prisma";
import { GET_COURSES_REVIEWS, update_COURSE } from "@/types/course.types";
import { CREATE_COURSE } from "@/validations/course.validation";
import { revalidatePath } from "next/cache";

export const createCourseAction=async(authorId:string,values:CREATE_COURSE)=>{
    try {
        const course=await prisma.course.create({
            data:{
                title:values.title,
                slug:values.slug,
                cover:{
                    create:{
                        url:values.cover.url,
                        fileId:values.cover.fileId
                    }
                },
                description:values.description,
                price:values.price,
                categoryId:values.categoryId,
                authorId
            },
            select:{
                slug:true
            }
        })
        return {
            slug:course.slug
        };
        
    } catch (error) {
        console.log(error);
        throw new Error("Failed to create course");
    }
}

export const getCourseBySlug=async(slug:string)=>{
    try {
        const course=await prisma.course.findUnique({
            where:{slug:slug as string},
            include:{
                cover:true,
                category:true
            }
        })
        return course;
    }catch{
        throw new Error("Failed to get course");
    }
}

export const updateCourseAction=async(slug:string,values:update_COURSE)=>{
    try {
        const course=await prisma.course.update({
            where:{slug:slug as string},
            data:{
                title:values.title,
                slug:values.slug,
                price:values.price,
                description:values.description,
                categoryId:values.categoryId,
                cover:{
                    update:{
                        url:values.cover?.url,
                        fileId:values.cover?.fileId
                    }
                },
            },
            select:{
                slug:true
            }
        })
        return {
            slug:course.slug
        };
        
    } catch {
        throw new Error("Failed to update course");
    }
}

export const publishCourseAction = async (slug: string, isPublished: boolean) => {
    try {
      const course = isPublished?await prisma.course.update({
        where: { slug },
        data: { isPublished: true },
        select: {
            isPublished: true
        }
      }):await prisma.course.update({
        where: { slug },
        data: { isPublished: false },
        select: {
            isPublished: true
        }
      })
      if(!course) throw new Error("Failed to publish course");
      revalidatePath(`/course/create/${slug}`);
      return course;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to publish course: ${(error as Error).message}`);
    }
  };


  export const getAllCoursesAction=async(search?:string, categorySearch?:string, minPrice?:number, maxPrice?:number)=>{
    try {
        const courseSelect = {
            id: true,
            slug: true,
            title: true,
            cover: {
              select: {
                url: true,
              },
            },
            author: {
              select: {
                username: true,
                profile: {
                  select: {
                    image: {
                      select: {
                        url: true,
                      },
                    },
                  },
                },
              },
            },
            price: true,
            category: {
              select: {
                name: true,
              },
            },
            createdAt: true,
          } as const;
          
          const courses = await prisma.course.findMany({
              where: {
                isPublished: true,
                ...(search && {
                  title: {
                    contains: search,
                    mode: 'insensitive'
                  },
                }),
                ...(categorySearch && {
                  category: {
                    name: {
                      equals: categorySearch,
                    },
                  }
                }),
                price: {
                  gte: minPrice,
                  lte: maxPrice,
                },
              },
              select: {
                ...courseSelect
              },
              orderBy:{
                price:'asc'
              }
            });

            return courses;
    } catch {
        throw new Error("Failed to get all courses");
    }
  }

  export const getReviewCoursesAction = async (data: GET_COURSES_REVIEWS) => {
    try {
        if (data.length === true) {
            const [totalReviews, averageRating] = await Promise.all([
              prisma.courseReview.count({
                where: {
                  courseId: data.courseId,
                },
              }),
              prisma.courseReview.aggregate({
                where: {
                  courseId: data.courseId,
                },
                _avg: {
                  rating: true,
                },
              }),
            ]);
      
            return { totalReviews, averageRating: averageRating._avg.rating ?? 0 };
          }
  
      const page = data.page && data.page > 0 ? data.page : 1;
      const take = typeof data.length === 'number' && data.length > 0 ? data.length : 10;
      const skip = (page - 1) * take;
  
      const reviews = await prisma.courseReview.findMany({
        where: {
          courseId: data.courseId,
        },
        select: {
          review: data.review ?? true,
          rating: data.rating ?? true,
          createdAt: data.date ?? true,
          user: data.author
            ? {
                select: {
                  username: true,
                  profile: {
                    select: {
                      image: {
                        select: {
                          url: true,
                        },
                      },
                    },
                  },
                },
              }
            : undefined,
        },
        orderBy: {
          createdAt: (data.by ?? 'DESC').toLowerCase() as 'asc' | 'desc',
        },
        take,
        skip,
      });
  
      return { reviews, page, take };
    } catch (error) {
      console.error('Error fetching course reviews:', error);
      throw new Error('Failed to fetch course reviews');
    }
  };