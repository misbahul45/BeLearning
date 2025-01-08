import { Image as ImageIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React from "react"
import { Image as TypeImage } from "@/types/web.types"

interface URLDialogProps {
    link:TypeImage | null
    setLik:React.Dispatch<React.SetStateAction<TypeImage | null>>
}

function URLImage({ link, setLik }: URLDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
       <ImageIcon className="size-5" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a Image</DialogTitle>
          <DialogDescription>
            Share a image to this article with others.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Image URL
            </Label>
            <Input
              id="link"
              type="text"
              value={link?.url || ''}
              onChange={(e) => setLik({url:e.target.value,fileId:''})}
              placeholder="https://example.com"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" >
              Add link
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default URLImage