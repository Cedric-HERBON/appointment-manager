import * as z from "zod";

const AvailabilitySchema = z.object({
    id_availability: z.string().trim().pipe(z.uuid()).optional(),
    id_practitioner: z.string().trim().pipe(z.uuid()),
    date: z.string().trim().pipe(z.iso.date()),
    start_time: z.string().trim().pipe(z.iso.time({ precision: -1 })),
    end_time: z.string().trim().pipe(z.iso.time({ precision: -1 })),
}).strict();

export { AvailabilitySchema };
