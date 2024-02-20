import { Piece } from "./Pieces/Piece";
import { Tile } from "./Tiles/Tile";

export default interface ChessState {
    pieces: Piece[][];
    tiles: Tile[][];
    whiteCards: string[];
    blackCards: string[];
    whiteToPlay: boolean;
    enPassantSquare: (number | null)[];
    castlingRights: boolean[];
    log: Log[];
}

export interface Log {
    content: string
    author: LogType
}

type LogType = "WHITE" | "BLACK" | "CONSOLE" | "WHITE_TEXT" | "BLACK_TEXT"