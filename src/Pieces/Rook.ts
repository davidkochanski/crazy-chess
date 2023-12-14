import { PieceBehaviour } from "./Piece";

export class Rook extends PieceBehaviour {
    constructor() {
        super();
        this.canMoveOrthagonally = true;
        this.isCastleable = true;

    }
}