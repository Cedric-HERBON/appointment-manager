import * as z from "zod";
import { emailSchema, isoDateSchema, passwordSchema, uuidSchema } from "../utils/templateSchema";

const PractitionerSchema = z.object({
    id_practitioner: uuidSchema.optional(),
    firstname: z.string().trim().min(2).toLowerCase(),
    lastname: z.string().trim().min(2).toLowerCase(),
    email: emailSchema,
    password: passwordSchema,
    birthdate: isoDateSchema,
    address: z.string().trim().min(3).toLowerCase().optional(),
    phone: z.string().trim().min(6).optional(),
    speciality: z.string().trim().min(2).toLowerCase().optional(),
});

export { PractitionerSchema };
