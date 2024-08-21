import mongoose from "mongoose";
import { compare, hash } from "bcrypt";
import { compareValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(value: string): Promise<Boolean>;
    omitPassword(): Pick<UserDocument, "_id" | "email" | "isVerified" | "createdAt" | "updatedAt" | "__v">
}

const User = new mongoose.Schema<UserDocument>({
    // defining the fields and their requiredness, default behavious, types, etc.
    name: {
        type: String,
        unique: false,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: false,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false,
        required: true
    }
},
    { // other options: for ex. mongoose will automagically fill in the created/updated fields!
        timestamps: true
    })


// hooks for the User. kinda like server-side functions on certain events
// in this case before the save happens
// we want to hash it before we save it.
User.pre("save", async function (nextFn) {
    if(!this.isModified("password")) return nextFn();

    this.password = await hash(this.password, 10);
    nextFn();
})

// static method on any user
// also, defining a new function.
User.methods.comparePassword = async function (value: string) { // NOTE: ARROW FUNCTION WONT WORK HERE!!!!!
    return compareValue(value, this.password)   // arrow functions do not create their own
                                                               // `this` context. they "inherit" it from previous scope, and so God
                                                               // knows what it could be. But if we use an actual `async function`, it forces a new `this` context refering to the instance of User Schema.
                                                               // huge!
} 

User.methods.omitPassword = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

export default mongoose.model<UserDocument>("User", User);