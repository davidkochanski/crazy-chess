import { EmptyPiece } from "../Pieces/EmptyPiece";
import { Piece } from "../Pieces/Piece";
import { BluePortal } from "./BluePortal";
import { Tile } from "./Tile";

export class OrangePortal extends Tile {
    constructor() {
        super();
        this.name = "orangeportal";
        this.onPieceLandHere = (currX: number, currY: number, pieces: Piece[][], tiles: Tile[][]) => {
            return new Promise((resolve) => {
                let destX, destY;

                tiles.forEach((row, x) => {
                    row.forEach((tile, y) => {
                        if (tile instanceof BluePortal) {
                            destX = x;
                            destY = y;
                        }
                    });
                });
    
                if(destX === undefined || destY === undefined) return pieces;
                const movingPiece = pieces[currX][currY];
    
                pieces[currX][currY] = new EmptyPiece();
                pieces[destX][destY] = movingPiece;
    
                resolve(pieces);
            })

        };
    }
}