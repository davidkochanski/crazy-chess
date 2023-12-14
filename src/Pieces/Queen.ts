import { PieceBehaviour } from "./Piece";

export class Queen extends PieceBehaviour {
    constructor() {
        super();
        this.canMoveDiagonally = true;
        this.canMoveOrthagonally = true;
    }
}