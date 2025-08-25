import { describe, expect, it } from "vitest";
import { AppointmentSlotSchema } from "../../src/schemas/appointment_slot.schema";

describe("AppointmentSlot - Unit", () => {
    it("Should validate correct data", () => {
        const data = {
            id_appointment_slot: "39a8f0a8-4a6c-4174-a837-6f3d547262f5",
            id_practitioner: "39a8f0a8-4a6c-4174-a837-6f3d547262f5",
            id_availability: "39a8f0a8-4a6c-4174-a837-6f3d547262f5",
            id_appointment_type: "39a8f0a8-4a6c-4174-a837-6f3d547262f5",
            date: "2025-09-26",
            hour: "09:30",
            status: "free",
            blop: "blop",
        };
        const result = AppointmentSlotSchema.parse(data);
        
        expect(result.id_appointment_slot).toBeTypeOf("string");
        expect(result.id_appointment_slot).toBe("39a8f0a8-4a6c-4174-a837-6f3d547262f5");
        expect(result.status).toBe("free");
    });

    // it("Should reject a wrong UUID format", () => {

    // });

    // it("", () => {

    // });

    // it("", () => {

    // });
});