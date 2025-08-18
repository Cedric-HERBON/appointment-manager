import type { NextFunction, Request, Response } from "express";

type IControllerMethod <T extends Request = Request> = (
    req: T,
    res: Response,
    next: NextFunction,
) => void;

function controllerWrapper <T extends Request = Request> (controllerMethod: IControllerMethod<T>) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controllerMethod(req as T, res, next);
        } catch (error) {
            next(error);
        };
    };
};

export { controllerWrapper };
