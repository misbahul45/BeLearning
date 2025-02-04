import { getUserAction } from "@/actions/user.action";
import { auth } from "@/lib/auth";
import Image from "next/image"
import Link from "next/link";
import { Button } from "../ui/button";
import { GraduationCapIcon } from "lucide-react";

const UserLogin = async() => {
  const session = await auth();
  let userLogin;
  if(session){
    userLogin = await getUserAction(session?.user?.email as string, {image: true, username: true, bio: true, email: true});
  }
  return (
    <>
      {userLogin?(
        <div className="flex gap-4 items-center">
          <Link href={`/profile`}>
            <Image src={userLogin?.profile?.image.url || ''} alt="logo" width={100} height={100} className="object-cover w-10 h-10 rounded-full" />
          </Link>
          <Link href={'/course/learn'}>
            <Button size={'icon'}>
              <GraduationCapIcon />
            </Button>
          </Link>
        </div>
      )
         :
         <div></div>
      }
    </>
  )
}

export default UserLogin