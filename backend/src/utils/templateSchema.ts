import * as z from "zod";
import { disposableDomains } from "./disposableDomains";

const passwordSchema = z
    .string()
    .min(8)
    .max(128)
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[0-9]/, "Password must contain a number");

const emailSchema = z
    .string()
    .toLowerCase()
    .pipe(z.email()).refine((email) => {
        const domain = email.split("@")[1]?.toLowerCase();
        return !disposableDomains.includes(domain);
    }, { message: "Disposable email adresses are not allowed"});

// Date format: YYYY-MM-DD
const isoDateSchema = z
    .string()
    .trim()
    .pipe(z.iso.date());

// Time format: HH:MM
const isoTimeSchema = z
    .string()
    .trim()
    .pipe(z.iso.time({ precision: -1}))

const uuidSchema = z
    .string()
    .trim()
    .pipe(z.uuid());

export { passwordSchema, emailSchema, isoDateSchema, isoTimeSchema, uuidSchema };
