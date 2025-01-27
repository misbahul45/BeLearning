"use client"

import Link from "@tiptap/extension-link"
import Paragraph from "@tiptap/extension-paragraph"
import Underline from "@tiptap/extension-underline"
import Text from "@tiptap/extension-text"
import { EditorContent, useEditor } from "@tiptap/react"
import Placeholder from "@tiptap/extension-placeholder"
import StarterKit from "@tiptap/starter-kit"
import type React from "react"
import { Bold, Italic, UnderlineIcon, LinkIcon } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  onLinkClick: () => void
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, onLinkClick }) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        paragraph: false,
        text: false,
      }),
      Placeholder.configure({
        placeholder: "Write a comment...",
      }),
      Text,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline italic hover:scale-105",
        },
      }),
      Paragraph.configure({
        HTMLAttributes: {
          class: "my-0.5 text-sm",
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[120px] max-h-[150px] text-base overflow-auto cursor-text [scrollbar-width:thin] rounded-md border p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:outline-none transition-all",
      },
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="space-y-2">
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
        <ToggleGroupItem
          value="link"
          aria-label="Add link"
          onClick={onLinkClick}
          data-state={editor.isActive("link") ? "on" : "off"}
        >
          <LinkIcon className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      <EditorContent editor={editor} />
    </div>
  )
}

export default RichTextEditor

