"use client"

import { type Editor } from "@tiptap/core"
import Link from "@tiptap/extension-link"
import Paragraph from "@tiptap/extension-paragraph"
import Placeholder from "@tiptap/extension-placeholder"
import StarterKit from "@tiptap/starter-kit"
import Text from "@tiptap/extension-text"
import Underline from "@tiptap/extension-underline"
import { EditorContent, useEditor } from "@tiptap/react"
import { Bold, Italic, UnderlineIcon } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
}

// Separate toolbar component for better organization
const EditorToolbar = ({ editor }: { editor: Editor }) => (
  <ToggleGroup type="multiple" className="justify-start">
    <ToggleGroupItem
      value="bold"
      aria-label="Toggle bold"
      onClick={() => editor.chain().focus().toggleBold().run()}
      data-state={editor.isActive("bold") ? "on" : "off"}
    >
      <Bold className="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem
      value="italic"
      aria-label="Toggle italic"
      onClick={() => editor.chain().focus().toggleItalic().run()}
      data-state={editor.isActive("italic") ? "on" : "off"}
    >
      <Italic className="h-4 w-4" />
    </ToggleGroupItem>
    <ToggleGroupItem
      value="underline"
      aria-label="Toggle underline"
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      data-state={editor.isActive("underline") ? "on" : "off"}
    >
      <UnderlineIcon className="h-4 w-4" />
    </ToggleGroupItem>
  </ToggleGroup>
)

// Constants for editor configuration
const EDITOR_CLASSES = 
  "min-h-[120px] max-h-[150px] text-base overflow-auto cursor-text " +
  "[scrollbar-width:thin] rounded-md border p-2 shadow-sm " +
  "focus-within:ring-2 focus-within:ring-primary focus-within:outline-none transition-all"

const LINK_CLASSES = "text-primary underline italic hover:scale-105"
const PARAGRAPH_CLASSES = "my-0.5 text-sm"

const RichTextEditor = ({ 
  content, 
  onChange, 
}: RichTextEditorProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        paragraph: false,
        text: false,
      }),
      Text,
      Underline,
      Placeholder.configure({
        placeholder: "Write a comment...",
      }),
      Link.configure({
        HTMLAttributes: {
          class: LINK_CLASSES,
        },
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: PARAGRAPH_CLASSES,
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: EDITOR_CLASSES,
      },
    },
  })


  if (!editor) {
    return null
  }

  return (
    <div className="space-y-2">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default RichTextEditor