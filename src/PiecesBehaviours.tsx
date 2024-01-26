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

    // effects.forEach((effect) => {
    //     switch(effect) {
    //         case "slow":
    //             options.maximumRange = 1;
    //             break;
    //         case "atomic":
    //             options.onCapture = (currX: number, currY: number, pieces: string[][]): string[][] => {
    //                 const deltas = [[currX+ 1, currY],[currX- 1, currY],[currX, currY+ 1],[currX, currY- 1],[currX+ 1, currY+ 1],[currX+ 1, currY- 1],[currX- 1, currY+ 1],[currX- 1, currY- 1]];

    //                 pieces[currX][currY] = "-";

    //                 deltas.forEach((delta) => {
    //                     let [x, y] = delta;

    //                     if(pieces[x][y].toLowerCase() !== "pawn") pieces[x][y] = "-";
    //                 })

    //                 return pieces;
    //             }
    //     }
    // })

    return options;
}