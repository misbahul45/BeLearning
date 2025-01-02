import { z } from "zod";

export default class WEB_VALIDATION {
    static readonly EMAIl=z.object({email:z.string().email({message:"Invalid email"})}) 
    static readonly URL=z.object({url:z.string().url({message:"Invalid url"})})
}


