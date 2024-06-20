import { produce } from "immer";
import ChessState from "../ChessState";
import { Piece } from "./Piece";
import { King } from "./King";

export class Pawn extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "pawn";
        this.colour = "#E57373";
        this.canMoveAsPawn = true;
        this.id = 1;
    }
}