import { PieceBehaviour } from "./Piece";

export class Camel extends PieceBehaviour {
    constructor() {
        super();
        this.canMoveAsCamel = true;

    }
}