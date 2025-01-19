import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LayoutGridIcon} from 'lucide-react';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import FormVideo from './FormVideo';
import { CHAPTER, COURSE_VALIDATION } from '@/validations/course.validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';

const Editor=dynamic(()=>import('../../article/create/FormEditor'),{ssr:false})

const FormChapter = () => {
  const form = useForm<CHAPTER>({
    resolver: zodResolver(COURSE_VALIDATION.CHAPTER),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      video:{
        name: undefined,
        url:undefined,
        fileId:undefined
      }
    }
  });


  const onSubmit = (data:CHAPTER) => {
    console.log(data);
  };

  return (
    <div className="flex-1 p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-100 text-cyan-700 rounded-lg">
              <LayoutGridIcon className="size-5" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">Customize Your Chapter</h2>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-sm font-medium text-gray-700 after:content-['*'] after:text-red-500 after:ml-1">Title</FormLabel>
                      </div>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="Enter chapter title"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={() => (
                  <FormItem>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-sm font-medium text-gray-700  after:content-['*'] after:text-red-500 after:ml-1">Description Or Content</FormLabel>
                      </div>
                      <FormControl>
                        <Editor initialContent={form.getValues('description')} onChange={(content) => form.setValue('description', content)} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={() => (
                  <FormItem>
                    <div className="space-y-2">
                      <FormControl>
                        <FormVideo videoUrl={form.getValues('video')?.url || ''}  fileId={form.getValues('video')?.fileId || ''} onUpdate={(url, fileId, name) =>form.setValue('video', {url, fileId, name: name as "UPLOAD" | "YOUTUBE"}) } />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <Button size={'lg'} type='submit' disabled={!form.formState.isValid} className='w-full'>Save Chapters</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormChapter;