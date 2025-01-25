import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextEditorMenuBar from "./TextEditorMenuBar";
import { Heading } from "@/lib/tiptap";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";
import Link from "@tiptap/extension-link";
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

type TextEditorProps = {
    onChange: (content: string) => void;
    initialContent?: string | null;
};

export default function RichTextEditor({
    onChange,
    initialContent,
}: TextEditorProps) {

    const editor = useEditor({
        extensions: [
          StarterKit.configure({
            heading: false,
            bulletList: false,
            orderedList: false,
            codeBlock: false,
            paragraph: false,
        }),
            Placeholder.configure({
              placeholder:'Write something...',
              showOnlyWhenEditable:false,
              emptyNodeClass:'text-muted-foreground'
            }),
            Underline,
            Heading,
            BulletList.configure({ 
              HTMLAttributes:{
                class: 'list-disc mb-1'
              }
            }),
            OrderedList.configure({ 
              HTMLAttributes:{
                class: 'list-decimal mb-1'
              }
            }),
            CodeBlock.configure({
              exitOnTripleEnter: true,
              exitOnArrowDown: true,
              defaultLanguage:"plain",
              HTMLAttributes: {
                class: "rounded-lg p-3 bg-gradient-to-tr from-gray-800 via-slate-900 to-gray-800 text-white my-4 overflow-x-auto shadow-lg text-sm",
              }
            }),
            Link.configure({
              openOnClick: false,
              HTMLAttributes: {
                class: "text-primary underline italic hover:scale-105"
              }
            }),
            Image.configure({
              HTMLAttributes: {
                class: "rounded-md hadow-lg w-auto h-auto object-cover mx-auto mb-2"
              }
            }),
            Paragraph.configure({
              HTMLAttributes: {
                class: "mb-4 md:text-medium text-base leading-6" 
              }
            }),
        ],
        content: initialContent?initialContent:null,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "min-h-[150px] cursor-text rounded-md border p-5 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ",
            },
        },
        immediatelyRender: false,
    });


    useEffect(() => {
      if (initialContent) {
        editor?.commands.setContent(initialContent);
      }
    }, [editor, initialContent]);
  
    return (
        <div className="space-y-2">
            <EditorContent className="p-4" editor={editor} />
            <TextEditorMenuBar editor={editor} />
        </div>
    );
}
