import { Piece } from "./Piece";

export class EmptyPiece extends Piece {
    constructor () {
        super(true);
        this.name = "empty";
        this.id = 0;
    }

    public isEmpty = (): boolean => {
        return true;
    }
}