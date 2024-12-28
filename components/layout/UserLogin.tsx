import { auth } from "@/lib/auth";
import Image from "next/image"
import Link from "next/link";

const UserLogin = async() => {
  const session = await auth();
   
  return (
    <Link href={`/profile`}>
        <Image src={session?.user.image!} alt="logo" width={100} height={100} className="object-cover w-10 h-10 rounded-full" />
    </Link>
  )
}

export default UserLogin