import { NextFunction, Request, Response } from "express";

export type AsyncController = (req: Request, res: Response, nextFn: NextFunction) => Promise<any>;

const catchErrorsAsynchronously = (asyncController: AsyncController): AsyncController => 
    async (req, res, nextFn) => {
        try {
            await asyncController(req, res, nextFn); // a function  `asyncController` has been passed in,
                                                     // call that function with the express parameters.
        } catch (error) {
            nextFn(error); // if there is an error,  pass error down to next handler/controller
        }
}

export default catchErrorsAsynchronously;