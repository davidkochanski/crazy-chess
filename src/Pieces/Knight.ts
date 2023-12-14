import { PieceBehaviour } from "./Piece";

export class Knight extends PieceBehaviour {
    constructor() {
        super();
        this.canMoveAsKnight = true;
    }
}