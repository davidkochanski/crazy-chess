import { Knook } from "../Pieces/Knook";
import { Piece } from "../Pieces/Piece";
import { Tile } from "../Tiles/Tile";
import { CardBehaviour } from "./Card";

export class Knookify extends CardBehaviour {
    constructor() {
        super();
        this.desciption = "Replace one of your rooks with a knook.";
        this.usableOn = ["rook"];
        this.canBeUsedOnFriendlyPieces = true;
        // this.onUse = (currX: number, currY: number, pieces: (Piece)[][], tiles: (Tile)[][]) => {
        //     const w = pieces[currX][currY]?.isWhite;

        //     if(!w )return;

        //     pieces[currX][currY] =  new Knook(w);

        //     return [pieces, tiles];
        // }
    }
}