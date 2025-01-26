'use client'
import Link from '@tiptap/extension-link'
import Paragraph from '@tiptap/extension-paragraph'
import Underline from '@tiptap/extension-underline'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import React, { useState } from 'react'
import { Bold, Italic, Underline as UnderlineIcon, Link as LinkIcon, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { sleep } from '@/lib/utils'
import toast from 'react-hot-toast'
import Loader from '@/components/Loaders/Loader'
import { createArticleCommentAction } from '@/actions/article.comments'
import { useRouter } from 'next/navigation'

interface Props{
  articleId: string
  userId?: string;
  parentId?:string;
  setReplay?:React.Dispatch<React.SetStateAction<string>>
}

const FormComment = ({articleId, userId, parentId, setReplay}: Props) => {
  const [showForm, setShowForm] = useState(parentId?true : false)
  const [comment, setComment] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
  const [isPending, startTransition] = React.useTransition();
  const router=useRouter()


  console.log(parentId)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false,
        text: false,
      }),
      Placeholder.configure({
        placeholder:'Write a comment...'
      }),
      Text,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline italic hover:scale-105"
        }
      }),
      Paragraph.configure({ 
        HTMLAttributes: {
          class: "my-0.5 text-sm"
        }
      }),
    ],
    content: comment,
    onUpdate: ({ editor }) => {
      setComment(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "min-h-[120px] max-h-[150px] text-base overflow-auto cursor-text [scrollbar-width:thin] rounded-md border p-2 shadow-sm ring-2 ring-gray-300 focus-within:ring-primary focus-within:outline-none transition-all",
      },
    },
    immediatelyRender: false,
  });

  const handleSendComment = (e:React.FormEvent) => {
    if(!comment) return null
    e.preventDefault()
    startTransition(async()=>{
      try {
        await sleep()
        await createArticleCommentAction({
          message: comment,
          userId: userId || '',
          articleId,
          parentId
        })
        toast.success('Comment sent successfully')
        setComment('')
        editor?.commands.setContent('');
        router.refresh()
      } catch (error) {
        toast.error((error as Error).message)
      }
    })
  };

  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run()
  };

  const toggleItalic = () => {
    editor?.chain().focus().toggleItalic().run()
  };

  const toggleUnderline = () => {
    editor?.chain().focus().toggleUnderline().run()
  };

  const openLinkModal = () => {
    setIsLinkModalOpen(true);
  };

  const addLink = () => {
    if (linkUrl) {
      editor?.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setIsLinkModalOpen(false);
    }
  };
  return (
    <div className='w-full'>
      {showForm ? 
        <form onSubmit={handleSendComment} className={`w-full transition-all duration-300`}>
          <div className="flex gap-2 mb-2">
            <Button
              size={'icon'}
              variant={editor?.isActive('bold')?'default':'ghost'}
              onClick={toggleBold} 
              title="Bold"
              type='button'
              className="hover:bg-primary hover:text-white"
            >
              <Bold size={16} />
            </Button>
            <Button
              size={'icon'}
              variant={editor?.isActive('italic')?'default':'ghost'}
              onClick={toggleItalic} 
              title="Italic"
              type='button'
              className="hover:bg-primary hover:text-white"
            >
              <Italic size={16} />
            </Button>
            <Button
              size={'icon'}
              variant={editor?.isActive('underline')?'default':'ghost'}
              onClick={toggleUnderline} 
              type='button'
              title="Underline"
              className="hover:bg-primary hover:text-white"
            >
              <UnderlineIcon size={16} />
            </Button>
            <Button
              size={'icon'}
              variant={editor?.isActive('link')?'default':'ghost'}
              onClick={openLinkModal} 
              type='button'
              title="Add Link"
              className="hover:bg-primary hover:text-white"
            >
              <LinkIcon size={16} />
            </Button>
          </div>

          <EditorContent editor={editor} className="text-base border rounded-lg p-2 focus:ring-2 focus:ring-primary focus:outline-none transition-all" />

          {isLinkModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-lg shadow-xl w-96">
                <h2 className="text-lg font-semibold mb-2">Add a Link</h2>
                <input 
                  type="text" 
                  placeholder="Enter URL" 
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full p-2 border rounded mb-4 text-base focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <div className="flex justify-end space-x-2">
                  <Button 
                    onClick={addLink} 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-base"
                  >
                    Add Link
                  </Button>
                  <Button 
                    type='button'
                    onClick={() => setIsLinkModalOpen(false)} 
                    className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 text-base"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant={'secondary'}
              type='button'
              onClick={()=>{
                setComment('')
                setReplay?.('')
                setShowForm(false)
              }}
              className="hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              disabled={isPending || comment===''}
              type='submit'
              className="flex items-center text-base bg-primary text-white hover:bg-primary-dark disabled:bg-gray-300"
            >
              {isPending?
                <Loader />
                :
                <>
                  <Send size={16} className="mr-2" /> Send
                </>
              }
            </Button>
          </div>
        </form>
      :
        !parentId &&
          <div onClick={()=>setShowForm(true)} className={`items-center justify-between flex cursor-pointer p-2 border-2 rounded-lg`}> 
            <p className='text-muted-foreground text-sm'>What are your thoughts?</p>
            <Button
              variant={'secondary'}
            >
              Comment
            </Button>
          </div>
      }
    </div>
  )
}

export default FormComment;