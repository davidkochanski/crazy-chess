import { Piece } from "./Piece";

export class EmptyPiece extends Piece {
    constructor () {
        super(true);
        this.name = "empty";
    }

    public isEmpty = (): boolean => {
        return true;
    }
}