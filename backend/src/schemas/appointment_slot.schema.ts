import * as z from "zod";

const SlotStatus = {
    free: "free",
    occupied: "occupied",
} as const;

const AppointmentSlotSchema = z.object({
    id_appointment_slot: z.string().trim().pipe(z.uuid()).optional(),
    id_practitioner: z.string().trim().pipe(z.uuid()),
    id_availability: z.string().trim().pipe(z.uuid()),
    id_appointment_type: z.string().trim().pipe(z.uuid()),
    date: z.string().trim().pipe(z.iso.date()),
    hour: z.string().trim().pipe(z.iso.time({ precision: -1})),
    status: z.enum(SlotStatus).nonoptional(),
}).strict();

export { AppointmentSlotSchema };
