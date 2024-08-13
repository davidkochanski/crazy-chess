import { EmptyPiece } from "../GameData/Pieces/EmptyPiece";
import { Piece } from "../GameData/Pieces/Piece";

export const decodePiece = (piece: Piece) => {
    try {
        piece.isEmpty
    } catch {
        console.log(piece.name);
        console.log(piece instanceof EmptyPiece);
    }


    if(piece.isEmpty) return "empty";

    let out = piece.name;

    if(!piece.isNeutral) {
        out = piece.isWhite ? "white-" + out : "black-" + out;
    }

    return out;
}

export const decodeEffects = (piece: Piece) => {
    if(piece.isEmpty) return [];

    return piece.attachments;
}

export const getCoords = (x: number, y: number) => {
    return `${String.fromCharCode(97 + x)}${y+1}`
}