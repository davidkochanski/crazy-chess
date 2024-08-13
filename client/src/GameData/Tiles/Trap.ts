import ChessState from "../scripts/ChessState";
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
        
        this.onMoveEnd = (currX: number, currY: number, state: ChessState) => {
            return new Promise((resolve) => {
                if(!state.pieces[currX][currY].isEmpty()) {
                    state.pieces[currX][currY] = new EmptyPiece();
                    state.tiles[currX][currY] = new EmptyTile();
                } 
    
                resolve(state);
            })

        }
    }
}