import { TileBehaviour } from "./Tile";

export class BluePortal extends TileBehaviour {
    constructor() {
        super();
        this.onPieceLandHere = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {
            let destX, destY;

            tiles.forEach((row, x) => {
                row.forEach((tile, y) => {
                    if (tile === "orange-portal") {
                        destX = x;
                        destY = y;
                    }
                });
            });

            if(destX === undefined || destY === undefined) return pieces;
            const movingPiece = pieces[currX][currY];

            pieces[currX][currY] = "-";
            pieces[destX][destY] = movingPiece;

            return pieces;
        };
    }
}