import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'

interface Props{
    tags:string[],
    setTags:(tags:string[])=>void
}

const FormTag = ({ tags, setTags }: Props) => {

    const handleAddTags=(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter'){
            const newValue=e.currentTarget.value.trim().split('')[0].toUpperCase()+e.currentTarget.value.trim().slice(1)
            if(!tags.includes(newValue)){
                setTags([...tags, newValue])
                e.currentTarget.value = ''
                return;
            }
            e.currentTarget.value = ''
            toast.error('Tag already exists')
        }
    }

    const handleRemove=(value:string)=>{
        if(value){
            setTags(tags.filter(tag=>tag!==value))
        }
    }
  return (
    <div className='space-y-2'>
        <Label htmlFor='tags' className='font-semibold'>Tags</Label>
        <Input onKeyDown={handleAddTags} id='tags' placeholder='Type and press enter to add tags' />
        <div className='flex w-full flex-wrap justify-start gap-4'>
            {tags.map((tag, index)=>(
                <div key={index} className={`flex items-center bg-slate-50 border-2 border-gray-100 shadow-md px-2.5 py-1 rounded`}>
                    {tag}
                   <Button onClick={()=>handleRemove(tag)} size={'icon'} variant={'outline'} type='button'><X className='size-4 ml-2' /></Button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default FormTag