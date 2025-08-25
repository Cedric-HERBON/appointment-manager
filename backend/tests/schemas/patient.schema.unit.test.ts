import { describe, expect, it } from "vitest";
import { PatientSchema } from "../../src/schemas/patient.schema";

describe("PatientSchema - Unit", () => {
    it("Should validate correct patient data with space to trim and convert uppercase to lowercase", () => {
        const data = {
            firstname: "John",
            lastname: "Doe",
            email: "John.Doe@gmail.com",
            password: "Password123!",
            birthdate: "1980-05-26",
            address: "3 rue des Chaloupes  ",
            phone: "0634289572",
        };
        const result = PatientSchema.parse(data);

        expect(result.firstname).toBe("john");
        expect(result.lastname).toBe("doe");
        expect(result.email).toBe("john.doe@gmail.com");
        expect(result.password).toBe("Password123!");
        expect(result.birthdate).toBe("1980-05-26");
        expect(result.address).toBe("3 rue des chaloupes");
        expect(result.phone).toBe("0634289572");
    });

    it("Should reject a diposable mail domail", () => {
        const data = {
            firstname: "John",
            lastname: "Doe",
            email: "John.Doe@yopmail.com",
            password: "Password123!",
            birthdate: "1980-05-26",
        };

        expect(() => { PatientSchema.parse(data) }).toThrowError(/Disposable email adresses are not allowed/);
    });

    it("Should reject a too short password", () => {
        const data = {
            firstname: "John",
            lastname: "Doe",
            email: "John.Doe@gmail.com",
            password: "Pass",
            birthdate: "1980-05-26",
        };
        
        expect(() => { PatientSchema.parse(data) }).toThrowError(/Too small: expected string to have >=8 characters/);
    });

    it("Should reject a password without at least one uppercase", () => {
        const data = {
            firstname: "John",
            lastname: "Doe",
            email: "John.Doe@gmail.com",
            password: "password123!",
            birthdate: "1980-05-26",
        };
        
        expect(() => { PatientSchema.parse(data) }).toThrowError(/Password must contain an uppercase letter/);
    });

    it("Should reject a password without at least one lowercase", () => {
        const data = {
            firstname: "John",
            lastname: "Doe",
            email: "John.Doe@gmail.com",
            password: "PASSWORD123!",
            birthdate: "1980-05-26",
        };
        
        expect(() => { PatientSchema.parse(data) }).toThrowError(/Password must contain a lowercase letter/);
    });

    it("Should reject a password without at least one number", () => {
        const data = {
            firstname: "John",
            lastname: "Doe",
            email: "John.Doe@gmail.com",
            password: "Password!",
            birthdate: "1980-05-26",
        };
        
        expect(() => { PatientSchema.parse(data) }).toThrowError(/Password must contain a number/);
    });

    it("Should reject a password with multiple error message (size, uppercase, lowercase, number)", () => {
        const data = {
            firstname: "John",
            lastname: "Doe",
            email: "John.Doe@gmail.com",
            password: "!!!",
            birthdate: "1980-05-26",
        };
        
        expect(() => { PatientSchema.parse(data) }).toThrowError(/Too small: expected string to have >=8 characters/);
        expect(() => { PatientSchema.parse(data) }).toThrowError(/Password must contain an uppercase letter/);
        expect(() => { PatientSchema.parse(data) }).toThrowError(/Password must contain a lowercase letter/);
        expect(() => { PatientSchema.parse(data) }).toThrowError(/Password must contain a number/);
    });
});