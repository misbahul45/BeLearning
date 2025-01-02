'use client'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Atom } from 'lucide-react'
import React from 'react'
import FormImage from './FormImage'
import { Image } from '@/types/user.types'
import FormTag from './FormTag'
import { Label } from '@/components/ui/label'
import dynamic from 'next/dynamic'


const Editor=dynamic(()=>import('./FormEditor'),{ssr:false})

const FormArticle = () => {
  const [image, setImage] = React.useState<Image| null>({
    url: '',
    fileId:'',
  });
  const [tags, setTags] = React.useState<string[]>([]);
  const [content, setContent] = React.useState<string | null>(null);


  console.log(content)

  return (
    <Card className='md:mt-8 sm:mt-4 mt-2'>
        <CardHeader>
            <CardTitle className='font-semibold md:text-2xl text-xl'>Article Details</CardTitle>
            <CardDescription>
                Write an engaging article that shares new knowledge. Be a part of the learning community by sharing valuable insights!
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form className='space-y-4'>
                <div>
                    <Label className='font-semibold'>Cover</Label>
                    <FormImage image={image} setImage={setImage} />
                </div>
                <div className='space-y-2'>
                    <Label className='font-semibold' htmlFor='title'>Title</Label>
                    <Input id='title' placeholder='Be learn something new' className='py-4' />
                </div>
                <div className='space-y-2'>
                    <Label className='font-semibold' htmlFor='slug'>Slug</Label>
                    <Input id='slug' placeholder='Article slug' className='py-4' />
                    <Button className='mt-2 flex gap-2 items-center' type='button'>
                        <Atom className='md:size-12 size-8 w-fit' />
                        Generate Slug
                    </Button>
                </div>
                <FormTag tags={tags} setTags={setTags} />
                <div className='space-y-2'>
                    <Label className='font-semibold'>Content</Label>
                    <Editor initialContent={content} onChange={(content: string) => setContent(content)} />
                </div>  
                <Button className='w-full' type='button'>Publish Article</Button>
            </form>
        </CardContent>
    </Card>
  )
}

export default FormArticle