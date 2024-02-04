import { EmptyPiece } from "../Pieces/EmptyPiece";
import { Piece } from "../Pieces/Piece";
import { EmptyTile } from "./EmptyTile";
import { Tile } from "./Tile";

export class Trap extends Tile {
    constructor() {
        super();
        this.name = "trap";
        this.isBlocking = true;
        this.isOccupyable = true;
        
        this.onMoveEnd = (currX: number, currY: number, pieces: Piece[][], tiles: Tile[][]) => {
            return new Promise((resolve) => {
                if(!pieces[currX][currY].isEmpty()) {
                    pieces[currX][currY] = new EmptyPiece();
                    tiles[currX][currY] = new EmptyTile();
                } 
    
                resolve(pieces);
            })

        }
    }
}