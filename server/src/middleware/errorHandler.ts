import { ErrorRequestHandler } from "express";
import { z } from "zod";

const errorHandler: ErrorRequestHandler = (err, req, res, nextFn) => {
    console.error(`[${req.path}] ${err}`);

    if(err instanceof z.ZodError) {
        return res.status(400).json({message: "Bad request"})
    }

    return res.status(500).json({
        message: "Internal Server Error."
    })
}

export default errorHandler;