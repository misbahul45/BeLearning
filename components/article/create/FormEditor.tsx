import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextEditorMenuBar from "./TextEditorMenuBar";
import { Heading } from "@/lib/tiptap";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import CodeBlock from "@tiptap/extension-code-block";

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
                class: 'list-decimal'
              }
            }),
            CodeBlock.configure({
              exitOnTripleEnter: true,
              exitOnArrowDown: true,
              defaultLanguage: "plaintext",
              HTMLAttributes: {
                class: "rounded-md p-4 bg-slate-700 text-white"
              }
            })
        ],
        content: initialContent,
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

    console.log(initialContent);
  
    return (
        <div className="space-y-2">
            <TextEditorMenuBar editor={editor} />
            <EditorContent className="p-4" editor={editor} />
        </div>
    );
}
