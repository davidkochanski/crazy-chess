import User from "../models/User";
import { sign } from "jsonwebtoken";
import Verification from "../models/Verification";
import Session from "../models/Session";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
import appAssert from "../utils/appAssert";
import { AppErrorCode } from "../utils/AppErrorCode";
import AppError from "../utils/AppError";

export type CreateAccountParams = {
    name: string;
    email: string;
    password: string;
    userAgent?: string
}

export const createAccount = async ( data: CreateAccountParams) => {
    // What happens when an account is created?
    
    const existingUser = await User.exists({ // This is the connection to the database!
                                     // User.exists() is built in, but User (model) we made earlier
                                     // by using mongoose. that is what connects us to the database.
        email: data.email
    })

    // if(existingUser) {
    //     throw new Error("User with this email already exists.");
    // }

    // now we have an AppError interface to work with
    
    appAssert(
        !existingUser,
        409,
        "User with this email already exists.",
        AppErrorCode.UserAlreadyExists
    )

    
    const newUser = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
    })

    // const verification = await Verification.create({
    //     userId: newUser._id,
    //     type: "email_verification",
    //     expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
    // })

    const session = await Session.create({
        userId: newUser._id,
        userAgent: data.userAgent
    })

    const refreshToken = sign(
        { sessionId: session._id },   // what are we signing
        JWT_REFRESH_SECRET,           // using what (I have the secret in a file, it's used to unlock it)
        { expiresIn: "30d", audience: ["user"] } // extra settings
    )

    const accessToken = sign(
        { userId: newUser._id, sessionId: session._id },
        JWT_SECRET,
        { expiresIn: "30d", audience: ["user"] }
    )

    return { newUser, refreshToken, accessToken }
}