import { describe, expect, it } from "vitest";
import { AppointmentTypeSchema } from "../../src/schemas/appointment_type.schema";

describe("AppointmentTypeSchema - Unit", () => {
    it("Should validate correct data with space trim and convert uppercase to lowercase", () => {
        const data = {
            id_appointment_type: "39a8f0a8-4a6c-4174-a837-6f3d547262f5",
            id_practitioner: "39a8f0a8-4a6c-4174-a837-6f3d547262f5",
            type: "Consultation urgente",
            duration: 15,
        };
        const result = AppointmentTypeSchema.parse(data);

        expect(result.id_appointment_type).toBeTypeOf("string");
        expect(result.id_appointment_type).toBe("39a8f0a8-4a6c-4174-a837-6f3d547262f5");
        expect(result.type).toBe("consultation urgente");
        expect(result.duration).toBe(15);
        expect(result.duration).toBeTypeOf("number");
    });
});
