import { getUserAction } from "@/actions/user.action";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { auth } from "@/lib/auth";
import { MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import ListComments from "./ListComments";
import FormComment from "../create/FormComment";

interface Props {
  size?: "sm" | "lg";
  isComment: boolean;
  articleId: string;
  authorId: string;
  slug: string
}

interface USER {
  id?: string;
  username?: string;
  profile?: {
    image: {
      url: string;
    };
  } | null;
}

export default async function CommentSidebar({ size = "sm", isComment, articleId, authorId, slug }: Props) {
  const session = await auth();
  let user: USER | null = null;

  if (session) {
    try {
      [user] = await Promise.all([
        getUserAction(session?.user.email as string, { id: true, image: true, username: true }),

      ]);
    } catch {
      console.log("error");
    }
  }



  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="submit"
          className={`${
            isComment
              ? "bg-primary hover:bg-cyan-600 text-white"
              : "bg-secondary hover:bg-gray-200 text-primary"
          } p-2 rounded-full shadow-md transition-all duration-200`}
        >
          <MessageCircleIcon className={`${size === "sm" ? "sm:size-5 size-3" : "sm:size-7 size-5"}`} />
        </button>
      </SheetTrigger>
      <SheetContent className="overflow-auto [scrollbar-width:thin]">
        <SheetHeader className="mb-4">
          <div className="flex justifybetween items-center">
            <SheetTitle className="text-xl font-bold">Comments</SheetTitle>
          </div>
          {user && (
            <Card className="flex items-center gap-2 p-2.5">
              <Image
                src={user.profile?.image.url || ""}
                alt={user.username || "User Profile Picture"}
                width={100}
                height={100}
                className="size-9 rounded-full shadow"
              />
              <p className="text-sm font-semibold text-gray-600">@{user.username}</p>
            </Card>
          )}
        </SheetHeader>
        <div className="space-y-3">
          <FormComment slug={slug} articleId={articleId} userId={user?.id}  />
          <ListComments slug={slug} articleId={articleId} articleAuthorId={authorId} userLogin={{ id:user?.id }} />
        </div>
        <SheetFooter
          className="flex justify-between items-center mt-2.5"
        >
          <SheetDescription className="text-sm text-gray-600">
            Article Comments          
          </SheetDescription>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
