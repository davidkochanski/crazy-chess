import User from "../models/User";
import { sign } from "jsonwebtoken";

export type CreateAccountParams = {
    email: string;
    password: string;
}

export const createAccount = async ( data: CreateAccountParams) => {
    // What happens when an account is created?
    
    const existingUser = await User.exists({ // This is the connection to the database!
                                     // User.exists() is built in, but User (model) we made earlier
                                     // by using mongoose. that is what connects us to the database.
        email: data.email
    })

    if(existingUser) {
        throw new Error("User with this email already exists.");
    }

    
    const newUser = await User.create({
        email: data.email,
        password: data.password,
    })

    // const refreshToken = sign()

}