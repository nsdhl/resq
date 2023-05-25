import { NextFunction, Request, Response } from "express";

const errorMiddleware = (err:Error, req:Request, res:Response, next:NextFunction) => {
    err.message = err.message || "Internal server Error";
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default errorMiddleware;