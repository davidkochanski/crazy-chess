import { PieceBehaviour } from "./Piece";

export class Amazon extends PieceBehaviour {
    constructor() {
        super();
        this.canMoveDiagonally = true;
        this.canMoveOrthagonally = true;
        this.canMoveAsKnight = true;
    }
}