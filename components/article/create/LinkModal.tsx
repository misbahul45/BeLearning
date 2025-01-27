import type React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LinkModalProps {
  isOpen: boolean
  onClose: () => void
  linkUrl: string
  setLinkUrl: (url: string) => void
  onAddLink: () => void
}

const LinkModal: React.FC<LinkModalProps> = ({ isOpen, onClose, linkUrl, setLinkUrl, onAddLink }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Link</DialogTitle>
        </DialogHeader>
        <Input type="text" placeholder="Enter URL" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={onAddLink}>Add Link</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default LinkModal

