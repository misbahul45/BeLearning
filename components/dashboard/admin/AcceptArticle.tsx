'use client'
import { FormEvent, useState } from 'react';
import { acceptArticleAction, rejectArticleAction } from "@/actions/article.action";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

type AcceptArticleProps = {
  slug: string;
};

const AcceptArticle = ({ slug }: AcceptArticleProps) => {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleAccept = async (e:FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsAccepting(true);
      await acceptArticleAction(slug);
      toast.success("Article accepted successfully!");
    } catch (error) {
      toast.error("Failed to accept the article. Please try again.");
      console.error("Accept error:", error);
    } finally {
      setIsAccepting(false);
    }
  };

  const handleReject = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsRejecting(true);
      await rejectArticleAction(slug);
      toast.success("Article rejected successfully!");
    } catch (error) {
      toast.error("Failed to reject the article. Please try again.");
      console.error("Reject error:", error);
    } finally {
      setIsRejecting(false);
    }
  };

  return (
    <div className="flex gap-4 justify-center my-4">
      <form onSubmit={handleAccept}>
        <Button 
          type="submit"
          disabled={isAccepting || isRejecting}
          aria-label="Accept article"
          className="min-w-24"
        >
          {isAccepting ? "Accepting..." : "Accept"}
        </Button>
      </form>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="destructive"
            disabled={isAccepting || isRejecting}
            className="min-w-24"
          >
            Reject
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently reject the article.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <form onSubmit={handleReject}>
              <AlertDialogAction type="submit" className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                {isRejecting ? "Rejecting..." : "Reject"}
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AcceptArticle;