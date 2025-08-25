import { describe, expect, it } from "vitest";
import { AvailabilitySchema } from "../../src/schemas/availability.schema";

describe("AvailabilitySchema - Unit", () => {
    it("Should validate correct data with space trim and convert uppercase to lowercase", () => {
        const data = {
            id_availability: "39a8f0a8-4a6c-4174-a837-6f3d547262f5",
            id_practitioner: "39a8f0a8-4a6c-4174-a837-6f3d547262f5",
            date: "2025-06-18",
            start_time: "09:45",
            end_time: "10:00",
        };
        const result = AvailabilitySchema.parse(data);

        expect(result.id_availability).toBeTypeOf("string");
        expect(result.id_availability).toBe("39a8f0a8-4a6c-4174-a837-6f3d547262f5");
        expect(result.id_practitioner).toBeTypeOf("string");
        expect(result.id_practitioner).toBe("39a8f0a8-4a6c-4174-a837-6f3d547262f5");
        expect(result.date).toBe("2025-06-18");
        expect(result.date).toBeTypeOf("string");
        expect(result.start_time).toBe("09:45");
        expect(result.end_time).toBe("10:00");
    });
});
