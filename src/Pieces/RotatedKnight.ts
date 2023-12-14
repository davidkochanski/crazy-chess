import { PieceBehaviour } from "./Piece";

export class RotatedKnight extends PieceBehaviour {
    constructor() {
        super();
        this.canMoveAsRotatedKnight = true;
    }
}