import { createPieceBehaviour } from "./Pieces/PieceFactory";

export type PieceType =
| "bishop"
| "rotatedrook"
| "queen"
| "rotatedqueen"
| "rook"
| "rotatedbishop"
| "knight"
| "king"
| "pawn"
| "amazon"
| "lisek"
| "camel"
| "knook"
| "archbishop"
| "fox"
| "axolotl"
| "duck"
| "gold"
| "rotatedknight";


export const getBehaviour = (piece: String) => {

    piece = piece.toLowerCase();

    const effects = piece.split("-");
    const type = effects.pop() as PieceType;

    const options = createPieceBehaviour(type);

    effects.forEach((effect) => {
        switch(effect) {
            case "slow":
                options.maximumRange = 1;
                break;
        }
    })

    return options;
}