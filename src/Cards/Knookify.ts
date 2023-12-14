import { CardBehaviour } from "./Card";
import { isWhite } from "../Moves";

export class Knookify extends CardBehaviour {
    constructor() {
        super();
        this.desciption = "Replace one of your rooks with a knook.";
        this.usableOn = ["rook"];
        this.canBeUsedOnFriendlyPieces = true;
        this.onUse = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {
            pieces[currX][currY] = isWhite(pieces[currX][currY]) ? "KNOOK" : "knook";

            return [pieces, tiles];
        }
    }
}