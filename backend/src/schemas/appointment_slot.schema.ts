import * as z from "zod";
import { isoDateSchema, isoTimeSchema, uuidSchema } from "../utils/templateSchema";

const SlotStatus = {
    free: "free",
    occupied: "occupied",
} as const;

const AppointmentSlotSchema = z.object({
    id_appointment_slot: uuidSchema.optional(),
    id_practitioner: uuidSchema,
    id_availability: uuidSchema,
    id_appointment_type: uuidSchema,
    date: isoDateSchema,
    hour: isoTimeSchema,
    status: z.enum(SlotStatus).nonoptional(),
});

export { AppointmentSlotSchema };
