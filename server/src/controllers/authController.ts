import { NODE_ENV } from "../constants/env";
import { createAccount } from "../services/authService";
import catchErrorsAsynchronously from "../utils/catchErrorsAsynchonously";
import { z } from "zod"

const registerSchema = z.object({ // zod makes this easy.
    name: z.string().min(1).max(31),
    email: z.string().email().min(1).max(255),
    password: z.string().min(1).max(255),
    confirmPassword: z.string().min(1).max(255),
}).refine((data) => {
    return data.password === data.confirmPassword; // passwords should match
}, { // if there's an error, send this:
    message: "Passwords do not match",
    path: ["confirmPassword"]
})



// validate req
// call a service (actually do things with req body data)
// return an HTTP response

// This function is called in authRoutes.ts, which is called when the (in this case) /auth/register API endpoint is accessed.

// the service used in this case, when accessing the REGISTER API endpoint,
// would be a createAccount service. This handler only makes sure that we got an email + password + confirmPassword. Then the createAccount actually makes the account (perhaps interacting with a database).
export const registerHandler = catchErrorsAsynchronously( // wrapped in error middleware function to make things ez.
    async (req, res) => {
        const request = registerSchema.parse(req.body); // turn the raw express into a format that zod likes

        const newAccount = await createAccount(request);

        if(!newAccount) return res.status(500).json({message: "Couldn't create user"})

        res.cookie("accessToken", newAccount.accessToken, {
            sameSite: "strict",
            httpOnly: true,
            secure: NODE_ENV !== "development",
            expires: new Date(Date.now() + 1000 * 60 * 15),
        })
        res.cookie("refreshToken", newAccount.refreshToken, {
            sameSite: "strict",
            httpOnly: true,
            secure: NODE_ENV !== "development",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
            path: "auth/refresh"
        });
        
        return res.status(201).json(newAccount)
    }
)

export const loginHandler = catchErrorsAsynchronously(
    async (req, res) => {
        
    }
)