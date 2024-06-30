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
        this.canMoveAsPawn = true;
        this.canEnPassant = true;
        this.id = 1;
    }
}