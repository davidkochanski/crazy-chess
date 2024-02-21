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
    result: GameState;
}

export interface Log {
    content: string
    byWhite?: boolean;
    author?: LogType
}

type LogType = "WHITE" | "BLACK" | "CONSOLE" | "WHITE_TEXT" | "BLACK_TEXT" | "WHITE_MOVE" | "BLACK_MOVE";

type GameState = "CONTINUE" | "WHITE_WON" | "BLACK_WON" | "DRAW"