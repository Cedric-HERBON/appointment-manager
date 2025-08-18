import * as z from "zod";

const AppointmentTypeSchema = z.object({
    id_appointment_type: z.string().trim().pipe(z.uuid()).optional(),
    id_practitioner: z.string().trim().pipe(z.uuid()),
    type: z.string().trim().min(1),
    duration: z.int().nonnegative().nonoptional(),
}).strict();

export { AppointmentTypeSchema };
