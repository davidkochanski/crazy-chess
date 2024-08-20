import mongoose from "mongoose";

export interface SessionDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    userAgent?: string;
    createdAt: Date;
    expiresAt: Date;
}

const Session = new mongoose.Schema<SessionDocument>({
    userId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        index: true,
    },
    userAgent: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        required: true,
        default: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
    }
})

export default mongoose.model<SessionDocument>("Session", Session);