import type { NextFunction, Request, Response } from "express";
import sanitizeHtml from "sanitize-html";

const strictOptions = {
    allowedTags: [],
    allowedAttributes: {},
};

function sanitizeString(string: string) {
    const sanitizedString = sanitizeHtml(string, strictOptions).trim();
    return sanitizedString;
};

function sanitizeBody(req: Request, _res: Response, next: NextFunction) {
    if (req.body && typeof req.body === "object") {
        for (const key in req.body) {
            if (typeof req.body[key] === "string") {
                req.body[key] = sanitizeString(req.body[key]);
            };
        };
    };
    next();
};

export { sanitizeBody, sanitizeString };
