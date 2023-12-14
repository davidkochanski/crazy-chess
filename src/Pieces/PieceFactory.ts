import { PieceBehaviour } from "./Piece"
import { Amazon } from "./Amazon";
import { Archbishop } from "./Archbishop";
import { Axolotl } from "./Axolotl";
import { Bishop } from "./Bishop";
import { Camel } from "./Camel";
import { Duck } from "./Duck";
import { Fox } from "./Fox";
import { Gold } from "./Gold";
import { King } from "./King";
import { Knight } from "./Knight";
import { Knook } from "./Knook";
import { Lisek } from "./Lisek";
import { Pawn } from "./Pawn";
import { Queen } from "./Queen";
import { Rook } from "./Rook";
import { RotatedBishop } from "./RotatedBishop";
import { RotatedKnight } from "./RotatedKnight";
import { RotatedQueen } from "./RotatedQueen";
import { RotatedRook } from "./RotatedRook";

export type Piece =
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



export const createPieceBehaviour = (piece: string): PieceBehaviour => {
    piece = piece.toLowerCase();

    const effects = piece.split("-");
    const pieceType = effects.pop() as Piece;

    switch (pieceType) {
        case "amazon": return new Amazon();
        case "archbishop": return new Archbishop();
        case "axolotl": return new Axolotl();
        case "bishop": return new Bishop();
        case "camel": return new Camel();
        case "duck": return new Duck();
        case "fox": return new Fox();
        case "gold": return new Gold();
        case "king": return new King();
        case "knight": return new Knight();
        case "knook": return new Knook();
        case "lisek": return new Lisek();
        case "pawn": return new Pawn();
        case "queen": return new Queen();
        case "rook": return new Rook();
        case "rotatedbishop": return new RotatedBishop();
        case "rotatedknight": return new RotatedKnight();
        case "rotatedqueen": return new RotatedQueen();
        case "rotatedrook": return new RotatedRook();
        default: return new PieceBehaviour();
    }
}

