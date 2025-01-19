"use client";
import React, { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { useForm } from 'react-hook-form';
import { COURSE_VALIDATION, CREATE_COURSE } from '@/validations/course.validation';
import FormImage from '../../article/create/FormImage';
import { Image as TypeImage } from '@/types/web.types';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { AtomIcon } from 'lucide-react';
import { sleep, slugify } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import SelectCategory from './SelectCategory';
import { Separator } from '@radix-ui/react-dropdown-menu';
import Loader from '../../Loaders/Loader';
import toast from 'react-hot-toast';
import { createCourseAction, updateCourseAction } from '@/actions/course.action';
import MoneyInput from './MoneyInput';
import { useRouter } from 'next/navigation';
import { update_COURSE } from '@/types/course.types';
import dynamic from 'next/dynamic';


const Editor=dynamic(()=>import('../../article/create/FormEditor'),{ssr:false})

interface Props{
    categories: {
        id:string
        name:string
    }[],
    authorId:string,
    course?:update_COURSE
}

const FormCreate = ({categories, authorId, course}:Props) => {
  const [isPending, startTransition] = React.useTransition();
  const [isPendingCourse, startTransitionCourse] = React.useTransition();
  const [category, setCategory]=React.useState<{id:string, name:string}|null>(
    course?{
      id:course.categoryId,
      name:course?.category?.name
    }:null
  );

  const router=useRouter();

  const form = useForm<CREATE_COURSE | update_COURSE>({
    mode:'onChange',
    resolver: zodResolver(COURSE_VALIDATION.CREATE),
    defaultValues:{
      title: course?.title || '',
      slug: course?.slug || '',
      cover: {
        url: course?.cover.url,
        fileId: course?.cover.fileId,
      },
      description: course?.description || '',
      price: course?.price || 0,
      categoryId: course?.categoryId || '',
    }
  });
  const [image, setImage] = useState<TypeImage | null>(course?.cover || null);
  const [money, setMoney] = useState<string>(course?.price.toString() || '0');

  const onSubmit = (values: CREATE_COURSE | update_COURSE) => {
    startTransitionCourse(async () => {
      await sleep()
      if(!course){
        try {
          const { slug:courseSlug }=await createCourseAction(authorId, values);
          form.reset()
          router.push(`/course/create/${courseSlug}`)
        } catch (error) {
          toast.error((error as Error).message);
        }
        return;
      }
      try {
        const { slug:courseSlug }=await updateCourseAction(course.slug, { ...values, id: course.id, category: course.category });
        form.reset()
        router.push(`/course/create/${courseSlug}`)
      } catch (error) {
        toast.error((error as Error).message);
      }
    });
  };

  useEffect(() => {
    form.setValue('cover', image ? { url: image.url, fileId: image.fileId } : { url: '', fileId: '' });
  }, [image, form]);

  useEffect(() => {
    form.setValue('categoryId', category ? category.id : '');
  },[category, form])

  useEffect(()=>{

  },[])

  const handleGenerateSlug = () => {
    if(!form.getValues('title')){
        toast.error('Failed to generate slug. Title is required');
        return;
    }
    startTransition(async()=>{
        const slug = await slugify(form.getValues('title'));
        form.setValue('slug', slug+'-'+Date.now());
    })
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full p-4 rounded-lg shadow-lg border-2 mt-4 space-y-4'>
          <FormImage image={image} setImage={setImage} />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Course title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         <Separator />
         <SelectCategory selectedCategory={category} setSelectedCategory={setCategory} categories={categories} />
         <Separator />
         <div>
          <h2>Price</h2>
          <MoneyInput
            value={money}
            onChange={(value) => setMoney(value)}
            placeholder='Price course'
          />
         </div>
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <div>
                    <Input placeholder="Course slug" {...field} />
                    <Button type="button" disabled={isPending} onClick={handleGenerateSlug} className='mt-2 flex items-center gap-2'>
                        {isPending?
                            <Loader />
                            :
                            <>
                                <AtomIcon className='size-4' />
                                Generate
                            </>
                        }
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
        control={form.control}
        name="description"
        render={() => (
            <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Editor initialContent={course?.description} onChange={(content) => form.setValue('description', content)} />
            </FormControl>
            <FormMessage />
            </FormItem>
        )}
        />
          <Button disabled={!form.formState.isValid || isPendingCourse} type='submit' className='w-full'>
            {isPendingCourse?
                <Loader />
                :
                (course?'Update Course':'Create Course')
            }
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormCreate;
