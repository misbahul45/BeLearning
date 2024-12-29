import { z } from "zod";

export class UserValidation {
    static UPDATE=z.object({
        avatar:z.string().optional(),
        username:z.string().min(3,{message:"Username must be at least 3 characters"}).optional(),
        email:z.string().email({message:"Invalid email"}),
        bio:z.string().optional(),
    })
}