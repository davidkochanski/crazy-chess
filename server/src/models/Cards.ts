import mongoose from "mongoose";
import { number } from "zod";

export interface CardsDocument extends mongoose.Document {
    objectId: mongoose.Types.ObjectId;
    canMoveAsKnight: boolean;
    canMoveDiagonally: boolean;
    canMoveOrthagonally: boolean;
    canMoveAsKing: boolean;
    canMoveAsPawn: boolean;
    canMoveAsCamel: boolean;
    canMoveAnywhere: boolean;
    canMoveAsGold: boolean;
    canMoveAsRotatedKnight: boolean;
    canMoveAsVillager: boolean;
    isMovableByPlayer: boolean ;
    isCastleable: boolean;
    isNeutral: boolean;
    isCapturable: boolean ;
    isBouncy: boolean;
    canCapture: boolean ;
    maximumRange: number;
    canEnPassant: boolean;
    isRoyal: boolean;

    name: string;
    description: string;
    image: string;
    colour: string;
    isWhite: boolean;
    attachments: string[];

    id: number;
    isEmpty: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const Cards = new mongoose.Schema<CardsDocument>({
    objectId: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        index: true,
    },
    canMoveAsKnight: {
        type: Boolean,
        default: false
    },
    canMoveDiagonally: {
        type: Boolean,
        default: false
    },
    canMoveOrthagonally: {
        type: Boolean,
        default: false
    },
    canMoveAsKing: {
        type: Boolean,
        default: false
    },
    canMoveAsPawn: {
        type: Boolean,
        default: false
    },
    canMoveAsCamel: {
        type: Boolean,
        default: false
    },
    canMoveAnywhere: {
        type: Boolean,
        default: false
    },
    canMoveAsGold: {
        type: Boolean,
        default: false
    },
    canMoveAsRotatedKnight: {
        type: Boolean,
        default: false
    },
    canMoveAsVillager: {
        type: Boolean,
        default: false
    },
    isMovableByPlayer: {
        type: Boolean,
        default: true,
    },
    isCastleable: {
        type: Boolean,
        default: false
    },
    isNeutral: {
        type: Boolean,
        default: false
    },
    isCapturable: {
        type: Boolean,
        default: true,
    },
    isBouncy: {
        type: Boolean,
        default: false
    },
    canCapture: {
        type: Boolean,
        default: true,
    },
    canEnPassant: {
        type: Boolean,
        default: false
    },
    isRoyal: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        default: "New Piece",
    },
    description: {
        type: String,
        default: "Yes! This is a piece."
    }, 
    image: {
        type: String,
        default: "pawn.png"
    },
    colour: {
        type: String,
        default: "#cccccc"
    },
    isWhite: {
        type: Boolean,
        default: true
    },
    isEmpty: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

export default mongoose.model<CardsDocument>("Cards", Cards);