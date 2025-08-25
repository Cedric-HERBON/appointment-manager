import type { NextFunction, Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";
import { sanitizeBody } from "../../src/middlewares/sanitizeHtml";

describe("sanitizeBody middleware - Unit", () => {
    const next: NextFunction = vi.fn();

    it("Should remove HTML tags from string fields", () => {
        const req = {
            body: {
                firstname: "<b>John</b>",
                lastname: "<script>alert('xss')</script>Doe"
            },
        } as unknown as Request;
        sanitizeBody(req, {} as Response, next);

        expect(req.body.firstname).toBe("John");
        expect(req.body.lastname).toBe("Doe");
        expect(next).toHaveBeenCalled();
    });

    it("Should leave non-string fields untouched", () => {
        const req = {
            body: {
                firstname: "<b>John</b>",
                lastname: "<script>alert('xss')</script>Doe",
                age: 25,
                active: true,
            },
        } as unknown as Request;
        sanitizeBody(req, {} as Response, next);

        expect(req.body.firstname).toBe("John");
        expect(req.body.lastname).toBe("Doe");
        expect(req.body.age).toBe(25);
        expect(req.body.active).toBe(true);
        expect(next).toHaveBeenCalled();
    });

    it("Should trim whitespace arount sanitized strings", () => {
        const req = {
            body: {
                firstname: "    <b> Alice </b>    ",
                lastname: "<script>  alert('xss')  </script> Doe  "
            },
        } as unknown as Request;
        sanitizeBody(req, {} as Response, next);

        expect(req.body.firstname).toBe("Alice");
        expect(req.body.lastname).toBe("Doe");
        expect(next).toHaveBeenCalled();
    });

    it("Should handle empty body", () => {
        const req = {
            body: {},
        } as unknown as Request;
        sanitizeBody(req, {} as Response, next);

        expect(req.body).toEqual({});
        expect(next).toHaveBeenCalled();
    });
});