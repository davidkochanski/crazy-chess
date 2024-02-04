import { EmptyPiece } from "../Pieces/EmptyPiece";
import { Piece } from "../Pieces/Piece";
import { EmptyTile } from "./EmptyTile";
import { Tile } from "./Tile";

export class Bomb extends Tile {
    constructor() {
        super();
        this.name = "bomb";
        this.isOccupyable = true;
        this.onMoveEnd = (currX: number, currY: number, pieces: (Piece)[][], tiles: (Tile)[][]) => {
            return new Promise((resolve) => {
                if(pieces[currX][currY] !== null) {
                    pieces[currX][currY] = new EmptyPiece();
    
                    for (let i = Math.max(0, currX - 1); i <= Math.min(7, currX + 1); i++) {
                        for (let j = Math.max(0, currY - 1); j <= Math.min(7, currY + 1); j++) {
                            pieces[i][j] = new EmptyPiece();
                        }
                    }
    
                    tiles[currX][currY] = new EmptyTile();
                } 
    
                resolve(pieces);
            })

        }
    }
}