import { ErrorRequestHandler } from "express";
import { z } from "zod";
import AppError from "../utils/AppError";

const errorHandler: ErrorRequestHandler = (err, req, res, nextFn) => {
    console.error(`[${req.path}] ${err}`);

    if(err instanceof z.ZodError) {
        return res.status(400).json({message: "Bad request"})
    }

    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
            errorCode: err.errorCode
        })
    }

    return res.status(500).json({
        message: "Internal Server Error."
    })
}

export default errorHandler;