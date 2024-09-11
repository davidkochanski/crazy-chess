import { Piece } from "./Piece";
import { v4 as uuidv4 } from "uuid"
export class NewPiece extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "New Piece";
        this.image = "pawn.png";
        this.colour = "#E57373";
        this.pieceId = uuidv4();
    }
}