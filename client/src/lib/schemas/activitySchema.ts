import {z} from 'zod';
import { requiredString } from '../util/util';


export const activitySchema = (isEdit:boolean) => z.object({
    title: requiredString('Title'),
    description: requiredString('Description'),
    category: requiredString('Category'),
    date: (z.preprocess((arg) => {
        if (typeof arg === "string" && arg !== "") return new Date(arg);
        return arg;
      }, z.date().nullable())
        .refine((d) => d !== null, { message: "Date is required" })
    //! Alert Date must be in the future
      .refine((d) => {
        if (!d) return false;
        return isEdit ? true : d > new Date(); // 👈 nếu edit thì bỏ qua check future
      }, { message: "Date must be in the future" })) as unknown as Date,
    location: z.object({
        venue: requiredString('Venue'),
        city: z.string().optional(),
        latitude: z.coerce.number() as unknown as number,
        longitude: z.coerce.number() as unknown as number
    }).partial()
})

export type ActivitySchema =  z.infer<ReturnType<typeof activitySchema>>;