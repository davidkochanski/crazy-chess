import { Piece } from "./Piece";

export class EmptyPiece extends Piece {

    constructor () {
        super(true);
    }

    isEmpty: boolean = true;

}