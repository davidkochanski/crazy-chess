import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, nextFn) => {
    console.error(`[${req.path}] ${err}`);
    console.error();
    return res.status(500).json({
        message: "Internal Server Error."
    })
}

export default errorHandler;