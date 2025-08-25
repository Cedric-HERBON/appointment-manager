import * as z from "zod";

const AppointmentStatus = {
    pending: "pending",
    confirmed: "confirmed",
    cancelled: "cancelled",
};

const AppointmentSchema = z.object({
    id_appointment: z.string().trim().pipe(z.uuid()).optional(),
    id_patient: z.string().trim().pipe(z.uuid()),
    id_appointment_slot: z.string().trim().pipe(z.uuid()),
    status: z.enum(AppointmentStatus).optional(),
});

export { AppointmentSchema };
