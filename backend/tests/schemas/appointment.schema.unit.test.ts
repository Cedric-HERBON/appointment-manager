import { describe, expect, it } from "vitest";
import { AppointmentSchema } from "../../src/schemas/appointment.schema"; 

describe("AppointmentSchema - Unit", () => {
    it("Should validate correct data with space trim and convert uppercase to lowercase", () => {
        const data = {
            id_appointment: "39a8f0a8-4a6c-4174-a837-6f3d547262f5",
            id_patient: "39a8f0a8-4a6c-4174-a837-6f3d547262f5",
            id_appointment_slot: "39a8f0a8-4a6c-4174-a837-6f3d547262f5",
            status: "confirmed",
        };
        const result = AppointmentSchema.parse(data);

        expect(result.id_appointment).toBeTypeOf("string");
        expect(result.id_appointment).toBe("39a8f0a8-4a6c-4174-a837-6f3d547262f5");
        expect(result.id_patient).toBeTypeOf("string");
        expect(result.id_patient).toBe("39a8f0a8-4a6c-4174-a837-6f3d547262f5");
        expect(result.id_appointment_slot).toBeTypeOf("string");
        expect(result.id_appointment_slot).toBe("39a8f0a8-4a6c-4174-a837-6f3d547262f5");
        expect(result.status).toBe("confirmed");
    });
});
