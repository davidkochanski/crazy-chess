
import { Piece } from "./Piece";
import { TrojanPawn } from "./TrojanPawn";

export class TrojanHorse extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "trojanhorse";
        this.canMoveAsKnight = true;
        this.onGetsCaptured = (currX: number, currY: number, pieces: (Piece)[][]): (Piece)[][] => {

            const colour = !pieces[currX][currY].isWhite;

            if(currX > 0) pieces[currX-1][currY] =  new TrojanPawn(colour);
            if(currX < 7) pieces[currX+1][currY] =  new TrojanPawn(colour);
            if(currY > 0) pieces[currX][currY-1] =  new TrojanPawn(colour);
            if(currY < 7) pieces[currX][currY+1] =  new TrojanPawn(colour);

            return pieces;
        }
    }
}