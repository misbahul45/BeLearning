import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MessageCircleIcon } from "lucide-react"

interface Props{
  size?:'sm'|'lg';
  isComment:boolean
}

export default function CommentSidebar({size='sm',isComment}:Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
          <button
            type="submit"
            className={`${isComment?'bg-primary hover:bg-cyan-600 text-white':'bg-secondary  hover:bg-gray-200 text-primary'} p-2 rounded-full shadow-md transition-all duration-200 `}
          >
              <MessageCircleIcon className={`${size==='sm'?'sm:size-5 size-3':'sm:size-7 size-5'}`} />
          </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when 
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">

        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
