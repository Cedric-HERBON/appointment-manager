import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

function validateSchema(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body.dataParsed = schema.parse(req.body);
            next();
        } catch (error) {
            return res.status(400).json({
                error: "Validation failed",
                details: error instanceof Error ? error.message: error,
            });
        };
    };
};

export { validateSchema };
