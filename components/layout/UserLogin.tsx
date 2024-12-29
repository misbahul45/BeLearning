import { getUserAction } from "@/actions/user.action";
import { auth } from "@/lib/auth";
import Image from "next/image"
import Link from "next/link";

const UserLogin = async() => {
  const session = await auth();
  let userLogin;
  if(session){
    userLogin = await getUserAction(session?.user?.email as string, {image: true, username: true, bio: true, email: true});
  }
  return (
    <>
      {userLogin?(
          <Link href={`/profile`}>
            <Image src={userLogin?.profile?.image.url || ''} alt="logo" width={100} height={100} className="object-cover w-10 h-10 rounded-full" />
         </Link>
      )
         :
         <div></div>
      }
    </>
  )
}

export default UserLogin