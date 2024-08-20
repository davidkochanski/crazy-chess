import mongoose from "mongoose";

const enum VerificationType {
    EmailVerification = "email_verification",
    PasswordReset = "password_reset"
}

export interface VerificationDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    type: VerificationType;
    expiresAt: Date;
    createdAt: Date;
}

const Verification = new mongoose.Schema<VerificationDocument>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    type: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        required: true,
    }
});


export default mongoose.model<VerificationDocument>(
    "VerificationCode",
    Verification,
    "verification_codes"
)