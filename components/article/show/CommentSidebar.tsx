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
import { getArticleCommentsAction } from "@/actions/article.comments";
import ListComments from "./ListComments";

interface Props {
  size?: "sm" | "lg";
  isComment: boolean;
  articleId: string;
  authorId: string;
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

export default async function CommentSidebar({ size = "sm", isComment, articleId, authorId }: Props) {
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

  const comments=await getArticleCommentsAction(articleId)

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
         <ListComments comments={comments} articleId={articleId} user={{id:user?.id}} authorId={authorId} />
        <SheetFooter>
          <SheetDescription>Response here</SheetDescription>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
