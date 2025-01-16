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
import Text from '@tiptap/extension-text'

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
            StarterKit,
            Underline,
            Heading,
            BulletList.configure({ 
              HTMLAttributes:{
                class: 'list-disc'
              }
            }),
            OrderedList.configure({ 
              HTMLAttributes:{
                class: 'list-decimal mb-2'
              }
            }),
            CodeBlock.configure({
              exitOnTripleEnter: true,
              exitOnArrowDown: true,
              defaultLanguage: "plaintext",
              HTMLAttributes: {
                class: "rounded-md p-4 bg-slate-700 text-white my-4 overflow-x-auto",
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
                class: "rounded-md w-full max-w-xl mx-auto my-4"
              }
            }),
            Paragraph.configure({
              HTMLAttributes: {
                class: "my-2 md:text-lg text-base" 
              }
            }),
            Text.configure({
              HTMLAttributes: {
                class: "my-2"
              }
            }) 
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



  
    return (
        <div className="space-y-2">
            <EditorContent className="p-4" editor={editor} />
            <TextEditorMenuBar editor={editor} />
        </div>
    );
}
