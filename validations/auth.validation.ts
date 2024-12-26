import { z } from "zod";

export class AUTH_VALIDATION {
    static readonly LOGIN=z.object({
        email:z.string().email({message:"Invalid email"}),
        password:z.string().min(8,{message:"Password must be at least 8 characters"})
    })

    static readonly REGISTER=z.object({
        username:z.string().min(3,{message:"Username must be at least 3 characters"}),
        email:z.string().email({message:"Invalid email"}),
        password:z.string().min(8,{message:"Password must be at least 8 characters"}),
        confirmPassword:z.string()
    }).refine((data)=>data.password===data.confirmPassword,
    {
        message:"Passwords do not match",
        path:["confirmPassword"]
    })

    static readonly EMAIL=z.object({email:z.string().email({message:"Invalid email"})})
}