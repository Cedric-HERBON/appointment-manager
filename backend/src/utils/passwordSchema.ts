import * as z from "zod";

const passwordSchema = z
    .string()
    .min(8)
    .max(128)
    .regex(/A-Z/, "Password must contain an uppercase letter")
    .regex(/a-z/, "Password must contain a lowercase letter")
    .regex(/0-9/, "Password must contain a number");

export { passwordSchema };
