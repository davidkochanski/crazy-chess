import Users from "../models/Users";
import { sign } from "jsonwebtoken";
import Verification from "../models/Verification";
import Sessions from "../models/Sessions";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import appAssert from "../utils/appAssert";
import { AppErrorCode } from "../utils/AppErrorCode";
import AppError from "../utils/AppError";
import { UNAUTHORIZED } from "../constants/http";
import { refreshTokenSignOptions, signToken, verifyToken } from "../utils/jwt";

export type CreateAccountParams = {
    name: string;
    email: string;
    password: string;
    userAgent?: string
}

export const createAccount = async ( data: CreateAccountParams) => {
    const existingUser = await Users.exists({ // This is the connection to the database!
                                        // User.exists() is built in, but User (model) we made earlier
                                        // by using mongoose. that is what connects us to the database.
        email: data.email
    })
    
    appAssert(
        !existingUser,
        409,
        "User with this email already exists.",
        AppErrorCode.UserAlreadyExists
    )

    
    const newUser = await Users.create({
        name: data.name,
        email: data.email,
        password: data.password,
    })

    // const verification = await Verification.create({
    //     userId: newUser._id,
    //     type: "email_verification",
    //     expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
    // })

    const session = await Sessions.create({
        userId: newUser._id,
        userAgent: data.userAgent
    })

    const refreshToken = signToken(
        {
          sessionId: session._id,
        },
        refreshTokenSignOptions
      );
      const accessToken = signToken({
        userId: newUser._id,
        sessionId: session._id,
      });
    return { user: newUser.omitPassword(), refreshToken, accessToken }
}

type LoginParams = {
    email: string;
    password: string;
    userAgent?: string;
}

export const loginUser = async({email, password, userAgent}: LoginParams) => {
    const user = await Users.findOne({email});
    appAssert(user, UNAUTHORIZED, "Invalid email or password.")

    const isValid = await user.comparePassword(password);
    appAssert(isValid, UNAUTHORIZED, "Invalid email or password.")

    const session = await Sessions.create({
        userId: user._id,
        userAgent
    })

    const refreshToken = signToken( {sessionId: session._id}, refreshTokenSignOptions);
    const accessToken = signToken( {sessionId: session._id, userId: user._id });

    // when we log in, the accessToken and refreshToken are (later) placed in the cookies.
    // Then the front end reads the cookies to see if we're logged in.
    // But it was decrypted long before
    return { user: user.omitPassword(), accessToken, refreshToken }
}

export const refreshAccessToken = async (token: string) => {
    const { payload } = verifyToken(token, {
        secret: refreshTokenSignOptions.secret
    })
    appAssert(payload, 401, "Cannot refresh: Invalid access token")

    const session = await Sessions.findById(payload.sessionId);
    appAssert(session && session.expiresAt.getTime() > Date.now() , 401, "Session expired") // The session is gone! 

    const sessionMustRefresh = session.expiresAt.getTime() - Date.now() < 1000 * 60 * 60 * 24

    if(sessionMustRefresh) {
        // if will expire "soon", set the expiry date later
        session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        await session.save(); // mongoose method
    }

    const accessToken = signToken({
        userId: session.userId,
        sessionId: session._id
    })

    return { 
        accessToken: accessToken,
        newRefreshToken: sessionMustRefresh ? signToken({
            sessionId: session._id,
        }, refreshTokenSignOptions) : undefined  // send a new refresh token only if we changed it
    };
}