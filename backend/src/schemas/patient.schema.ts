import * as z from "zod";
import { disposableDomains } from "../utils/disposableDomains";
import { passwordSchema } from "../utils/passwordSchema";

const PatientSchema = z.object({
    id_patient: z.string().trim().pipe(z.uuid()).optional(),
    firstname: z.string().trim().min(2).toLowerCase(),
    lastname: z.string().trim().min(2).toLowerCase(),
    email: z.string().pipe(z.email()).refine((email) => {
        const domain = email.split("@")[1]?.toLowerCase();
        return !disposableDomains.includes(domain);
    }, { message: "Disposable email adresses are not allowed"}),
    password: passwordSchema,
    birthdate: z.string().trim().pipe(z.iso.date()),
    address: z.string().trim().min(2).toLowerCase().optional(),
    phone: z.string().trim().min(6).optional(),
}).strict();

export { PatientSchema };
