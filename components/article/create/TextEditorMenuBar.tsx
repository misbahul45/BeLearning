import { Bold, Italic, Strikethrough, CodeSquare ,ListOrdered, Redo, Undo, Underline, List, Heading1, Heading2 } from "lucide-react";
import { Editor } from "@tiptap/react";
import URLDialog from "./URLDialog";
import React from "react";
import URLImage from "./URLImage";
import { Image } from "@/types/web.types";

  const Button = ({
    onClick,
    isActive,
    disabled,
    children,
  }: {
    onClick: () => void;
    isActive: boolean;
    disabled?: boolean;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`p-2 ${isActive ? "bg-violet-500 text-white" : "hover:bg-violet-200"} focus:outline-none rounded`}
    >
      {children}
    </button>
  );

  export default function TextEditorMenuBar({
    editor,
  }: {
    editor: Editor | null;
  }) {

    const [link, setLink] = React.useState("");
    const [image, setImage] = React.useState<Image | null>(null);

    if (!editor) return null;
    const buttons = [
      {
       icon: <Heading1 className="size-5" />,
         onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
         isActive: editor.isActive("heading", { level: 1 }), 
      },
      {
        icon: <Heading2 className="size-5" />,
        onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: editor.isActive("heading", { level: 2 }),
      },
      {
        icon: <Bold className="size-5" />,
        onClick: () => editor.chain().focus().toggleBold().run(),
        isActive: editor.isActive("bold"),
      },
      {
        icon: <Underline className="size-5" />,
        onClick: () => editor.chain().focus().toggleUnderline().run(),
        isActive: editor.isActive("underline"),
      },
      {
        icon: <Italic className="size-5" />,
        onClick: () => editor.chain().focus().toggleItalic().run(),
        isActive: editor.isActive("italic"),
        disabled: !editor.can().chain().focus().toggleItalic().run(),
      },
      {
        icon: <Strikethrough className="size-5" />,
        onClick: () => editor.chain().focus().toggleStrike().run(),
        isActive: editor.isActive("strike"),
        disabled: !editor.can().chain().focus().toggleStrike().run(),
      },
      {
        icon: <CodeSquare className="size-5" />,
        onClick: () => editor.chain().focus().toggleCodeBlock().run(),
        isActive: editor.isActive("codeBlock"),
        disabled: !editor.can().chain().focus().toggleCodeBlock().run(),
      },
      {
        icon: <List className="size-5" />,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        isActive: editor.isActive("bulletList"),
      },
      {
        icon: <ListOrdered className="size-5" />,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: editor.isActive("orderedList"),
        disabled: !editor.can().chain().focus().toggleOrderedList().run(),
      },
      {
        icon:<URLDialog link={link} setLik={setLink} />,
        onClick: () => {
          if (link) {
            editor.chain().focus().extendMarkRange("link").setLink({ href: link }).run();
            setLink("");
          }
        },
        isActive: editor.isActive("link"),
        disabled: !editor.can().chain().focus().extendMarkRange("link").run(),
      },
      {
        icon:<URLImage link={image} setLik={setImage} />,
        onClick:()=>{
          if (image) {
            editor.chain().focus().setImage({ src: image.url, alt: image.fileId || new Date().toISOString() }).run();
          }
        },
        isActive: editor.isActive("image"),
      },
      {
        icon: <Undo className="size-5" />,
        onClick: () => editor.chain().focus().undo().run(),
        isActive: editor.isActive("undo"),
        disabled: !editor.can().chain().focus().undo().run(),
      },
      {
        icon: <Redo className="size-5" />,
        onClick: () => editor.chain().focus().redo().run(),
        isActive: editor.isActive("redo"),
        disabled: !editor.can().chain().focus().redo().run(),
      },
    ];
  
    return (
      <div className="mb-2 flex gap-2 flex-wrap sm:justify-start justify-center ">
        {buttons.map(({ icon, onClick, isActive, disabled }, index) => (
          <Button
            key={index}
            onClick={onClick}
            isActive={isActive}
            disabled={disabled}
          >
            {icon}
          </Button>
        ))}
      </div>
    );
  }
  