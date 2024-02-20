
import { Piece } from "./Piece";
import { TrojanPawn } from "./TrojanPawn";

export class TrojanHorse extends Piece {
    constructor(isWhite: boolean) {
        super(isWhite);
        this.name = "knight";
        this.canMoveAsKnight = true;
        this.onGetsCaptured = (currX: number, currY: number, state) => {

            const colour = !state.whiteToPlay;

            if(currX > 0) state.pieces[currX-1][currY] =  new TrojanPawn(colour);
            if(currX < 7) state.pieces[currX+1][currY] =  new TrojanPawn(colour);
            if(currY > 0) state.pieces[currX][currY-1] =  new TrojanPawn(colour);
            if(currY < 7) state.pieces[currX][currY+1] =  new TrojanPawn(colour);

            state.log.push({
                content: "It's a Trojan Horse! Pawns storm enemy lines!",
                byWhite: state.whiteToPlay
            })

            return state;
        }
    }
}