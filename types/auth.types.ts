import { AUTH_VALIDATION } from "@/validations/auth.validation";
import { z } from "zod";

export namespace AUTH_TYPES {
    export type LOGIN=z.infer<typeof AUTH_VALIDATION.LOGIN>

    export type REGISTER=z.infer<typeof AUTH_VALIDATION.REGISTER>
}