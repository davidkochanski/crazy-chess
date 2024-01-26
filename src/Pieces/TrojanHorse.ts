
import { Piece } from "./Piece";
import { TrojanPawn } from "./TrojanPawn";

export class TrojanHorse extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "trojanhorse";
        this.canMoveAsKnight = true;
        this.onGetsCaptured = (currX: number, currY: number, pieces: (Piece)[][]): (Piece)[][] => {
            // const newPiece = !isWhite(pieces[currX][currY]) ? "TROJANPAWN" : "trojanpawn";
            const newPiece = new TrojanPawn(false);

            if(currX > 0) pieces[currX-1][currY] = newPiece;
            if(currX < 7) pieces[currX+1][currY] = newPiece;
            if(currY > 0) pieces[currX][currY-1] = newPiece;
            if(currY < 7) pieces[currX][currY+1] = newPiece;

            return pieces;
        }
    }
}