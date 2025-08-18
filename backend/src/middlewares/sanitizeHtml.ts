import type { NextFunction, Request, Response } from "express";
import sanitizeHtml from "sanitize-html";

const strictOptions = {
    allowedTags: [],
    allowedAttributes: {},
};

function sanitizeBody(req: Request, _res: Response, next: NextFunction) {
    if (req.body && typeof req.body === "object") {
        for (const key of req.body) {
            if (typeof req.body[key] === "string") {
                req.body[key] = sanitizeHtml(req.body[key], strictOptions).trim();
            };
        };
    };
    next();
};

export { sanitizeBody };
