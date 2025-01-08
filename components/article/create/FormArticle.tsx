'use client'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Atom } from 'lucide-react'
import React from 'react'
import FormImage from './FormImage'
import { Image } from '@/types/web.types'
import FormTag from './FormTag'
import { Label } from '@/components/ui/label'
import dynamic from 'next/dynamic'
import { createArticleAction } from '@/actions/article.action'
import toast from 'react-hot-toast'
import { slugify } from '@/lib/utils'
import Loader from '@/components/Loaders/Loader'
import { useRouter } from 'next/navigation'


const Editor=dynamic(()=>import('./FormEditor'),{ssr:false})

const FormArticle = ({ authorId }: { authorId: string }) => { 
 const router=useRouter();
  const [image, setImage] = React.useState<Image>({
    url: '',
    fileId: '',
  });
  const [title, setTitle] = React.useState<string>('');
  const [slug, setSlug] = React.useState<string>('');
  const [tags, setTags] = React.useState<string[]>([]);
  const [content, setContent] = React.useState<string>('');

  const [loading, setLoading] = React.useState({
    type: '',
    state: false,
  });

  const handleSumbitToDraf=async(e:React.FormEvent)=>{
    e.preventDefault()
    try {
        setLoading({state:true,type:'submit'})  
        if(!image.url || !image.fileId || !title || !slug || !tags.length || !content){
            throw new Error('All fields are required')
        }
        await createArticleAction({
            authorId,
            title,
            content,
            tags,
            slug,
            cover:image
        })
        toast.success('Article saved as draft')
        router.push('/dashboard')
    } catch (error) {
        toast.error((error as Error).message)
    }
    setLoading({state:false,type:''})
  }

  const generateSlug=async()=>{
    setLoading({state:true,type:'slug'})
    const slugTitle=await slugify(title)
    setSlug(slugTitle+'-'+Date.now().toString())
    setLoading({state:false,type:''})
  }

  return (
    <Card className='md:mt-8 sm:mt-4 mt-2'>
        <CardHeader>
            <CardTitle className='font-semibold md:text-2xl text-xl'>Article Details</CardTitle>
            <CardDescription>
                Write an engaging article that shares new knowledge. Be a part of the learning community by sharing valuable insights!
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSumbitToDraf} className='space-y-4'>
                <div>
                    <Label className='font-semibold after:content-["*"] after:text-red-500 after:ml-1'>Cover</Label>
                    <FormImage image={image} setImage={setImage} />
                </div>
                <div className='space-y-2'>
                    <Label className='font-semibold after:content-["*"] after:text-red-500 after:ml-1' htmlFor='title'>Title</Label>
                    <Input required value={title} onChange={(e) => setTitle(e.target.value)} id='title' placeholder='Be learn something new' className='py-4' />
                </div>
                <div className='space-y-2'>
                    <Label className='font-semibold after:content-["*"] after:text-red-500 after:ml-1' htmlFor='slug'>Slug</Label>
                    <Input required value={slug} onChange={(e) => setSlug(e.target.value)} id='slug' placeholder='Article slug' className='py-4' />
                    <Button disabled={loading.state && loading.type === 'slug'} onClick={generateSlug} className='mt-2 flex gap-2 items-center' type='button'>
                        {loading.state && loading.type === 'slug' ? (<Loader />)
                            :
                            (<>
                                <Atom className='md:size-12 size-8 w-fit' />
                                Generate Slug
                             </>
                            )}
                    </Button>
                </div>
                <FormTag tags={tags} setTags={setTags} />
                <div className='space-y-2'>
                    <Label className='font-semibold after:content-["*"] after:text-red-500 after:ml-1'>Content</Label>
                    <Editor initialContent={content} onChange={(content: string) => setContent(content)} />
                </div>  
                <Button disabled={loading.state && loading.type === 'submit'} className='w-full' type='submit'>
                    {loading.state && loading.type === 'submit' ? (<Loader />)
                        :
                        "Save as Draft"
                    }
                </Button>
            </form>
        </CardContent>
    </Card>
  )
}

export default FormArticle