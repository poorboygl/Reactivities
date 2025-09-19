import {z} from "zod";
import { requiredString } from "../util/util";

export const editProfileSchema = z.object({
    displayName: requiredString('Display name'),
    bio: z.string().optional()
})

export type editProfileSchema = z.infer<typeof editProfileSchema>