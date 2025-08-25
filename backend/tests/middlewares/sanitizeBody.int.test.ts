import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../../src/app";

describe("sanitizeBody middleware - Integration", () => {
    app.post("/test", (req, res) => {
        res.json(req.body);
    });

    it("Should sanitize HTML in body fields", async () => {
        const data = {
            firstname: "  <b> Bob </b> ",
            note: "<img src=x onerror=alert(1)>",
        };
        const response = await request(app)
            .post("/test")
            .send(data);
        
        expect(response.status).toBe(200);
        expect(response.body.firstname).toBe("Bob");
        expect(response.body.note).toBe("")
    });

    it("Should keep valid plain text", async () => {
        const data = {
            message: "Hello world   "
        };
        const response = await request(app)
            .post("/test")
            .send(data);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Hello world")
    });

    it("Should sanitize HTML in body fields", async () => {
        const data = {
            firstname: "  <b> Bob </b> ",
            note: "<img src=x onerror=alert(1)>"
        };
        const response = await request(app)
            .post("/test")
            .send(data);
        
        expect(response.status).toBe(200);
        expect(response.body.firstname).toBe("Bob");
        expect(response.body.note).toBe("")
    });
});
