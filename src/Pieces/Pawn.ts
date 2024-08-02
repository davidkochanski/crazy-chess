import { produce } from "immer";
import ChessState from "../ChessState";
import { Piece } from "./Piece";
import { King } from "./King";

export class Pawn extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "Pawn";
        this.image = "pawn.png";
        this.colour = "#E57373";
        this.description = "Basic chessmen. Can move forwards, sometimes twice, can promote, and can even en passant."
        this.canMoveAsPawn = true;
        this.canEnPassant = true;
        this.id = 1;
    }
}