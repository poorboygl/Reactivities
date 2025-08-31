import {z} from 'zod';

const requiredString = (fieldName: string) => z.string().min(1, { message: `${fieldName} is required` });

export const activitySchema =  z.object({
    title: requiredString('Title'),
    description: requiredString('Description'),
    category: requiredString('Category'),
    date: z.date().nullable().refine(d => d !== null, {
    message: "Date is required",
    }),
    city: requiredString('City'),
    venue: requiredString('Venue')
})

export type ActivitySchema = z.infer<typeof activitySchema>;