import mongoose from "mongoose";
import { compare, hash } from "bcrypt";
import { compareValue } from "../utils/bcrypt";
import Cards, { CardsDocument } from "./Cards";

export interface UserDocument extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    cards: Array<CardsDocument>;
    comparePassword(value: string): Promise<Boolean>;
    omitPassword(): Pick<UserDocument, "_id" | "email" | "isVerified" | "createdAt" | "updatedAt" | "__v" | "cards">
}

const User = new mongoose.Schema<UserDocument>({
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
    },
    cards: [
        {
            type: Cards.schema,
            default: [],
            required: true,
        }
    ]    
}, {
    timestamps: true
});

User.pre("save", async function (nextFn) {
    if (!this.isModified("password")) return nextFn();
    this.password = await hash(this.password, 10);
    nextFn();
});

User.methods.comparePassword = async function (value: string) {
    return compareValue(value, this.password);
};

User.methods.omitPassword = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

export default mongoose.model<UserDocument>("User", User);
