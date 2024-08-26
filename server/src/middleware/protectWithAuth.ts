import { RequestHandler } from "express";
import appAssert from "../utils/appAssert";
import { AppErrorCode } from "../utils/AppErrorCode";
import { verifyToken } from "../utils/jwt";

export const protectWithAuth: RequestHandler = (req, res, nextFn) => {
    const accessToken = req.cookies["accessToken"];
    // appAssert(accessToken, 401, "Forbidden", AppErrorCode.InvalidAccessToken);

    if(!accessToken) {
        nextFn();
        return;
    }

    const { error, payload } = verifyToken(accessToken); // remember, verify token returns either an error or a payload
    appAssert(payload, 401, "Couldn't verify token", AppErrorCode.InvalidAccessToken);

    // If we were sucessful, mutate the request
    // to have the decoded user and session IDs.
    req.userId = payload.userId;
    req.sessionId = payload.sessionId;

    // then call nextFn. that's the rest of the controllers.
    nextFn();    
}