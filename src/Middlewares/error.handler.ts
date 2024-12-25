import { NextFunction, Response, Request } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err.stack);
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message, error: err.stack });
};
