import { EmptyPiece } from "../Pieces/EmptyPiece";
import { Piece } from "../Pieces/Piece";
import { OrangePortal } from "./OrangePortal";
import { Tile } from "./Tile";

export class BluePortal extends Tile {
    constructor() {
        super();
        this.name = "blueportal"
        this.onPieceLandHere = (currX: number, currY: number, pieces: (Piece)[][], tiles: (Tile)[][]) => {
            return new Promise((resolve) => {
                let destX, destY;

                tiles.forEach((row, x) => {
                    row.forEach((tile, y) => {
                        if (tile instanceof OrangePortal) {
                            destX = x;
                            destY = y;
                        }
                    });
                });
    
                if(destX === undefined || destY === undefined) {
                    resolve(pieces); 
                    return;
                }
                
                const movingPiece = pieces[currX][currY];
                
                pieces[currX][currY] = new EmptyPiece();
                pieces[destX][destY] = movingPiece;
    
                resolve(pieces);
            })

        };
    }
}