import { getCardAction } from "./CardBehaviours";
import { Piece } from "./Pieces/Piece";
import { Queen } from "./Pieces/Queen";
import { Pawn } from "./Pieces/Pawn";
import { King } from "./Pieces/King";
import { Tile } from "./Tiles/Tile";
import { EmptyPiece } from "./Pieces/EmptyPiece";
import ChessState from "./ChessState";

export const areDifferentColours = (attacker: Piece, defender: Piece) => {
    if(attacker.isEmpty() || defender.isEmpty()) return false;

    if(attacker.isNeutral || defender.isNeutral) {
        return defender.isCapturable;
    }

    return (attacker.isWhite && !defender.isWhite) || (!attacker.isWhite && defender.isWhite);
}


export const generateLegalMoves = (x: number, y: number, state: ChessState, includePieceVision: boolean = false) => {
    const MAX = 7;
    const MIN = 0;

    const board = state.pieces;
    const tiles = state.tiles;
    const castlingRights = state.castlingRights;
    const enPassantSquare = state.enPassantSquare;

    const movingPiece = board[x][y];
    if(movingPiece.isEmpty()) return [];

    const updateLegalMoves = (x: number, y: number) => {
        if(x < MIN || x > MAX || y < MIN || y > MAX) return false;

        if(tiles[x][y].isBlocking) {

            if(tiles[x][y].isOccupyable) legalMoves.push([x,y]);
            return true;
        }

        const piece = board[x][y];

        if(!piece.isEmpty()) {
            if(!piece.isCapturable) return true;
            
            if(areDifferentColours(piece, movingPiece) || piece.isNeutral || includePieceVision) {
                legalMoves.push([x,y]);
            }

            if(piece instanceof King) return false;
            return true;
        } else {
            legalMoves.push([x, y]);
            return false;
        }

    }

    let legalMoves: Array<Array<number>> = [];

    if (movingPiece.canMoveDiagonally) {
        for (let i = x + 1, j = y + 1, range = 0; i <= MAX && j <= MAX; i++, j++, range++) {
            if(range >= movingPiece.maximumRange) break;
            if(updateLegalMoves(i, j)) break;
        }

        for (let i = x + 1, j = y - 1, range = 0; i <= MAX && j >= MIN; i++, j--, range++) {
            if(range >= movingPiece.maximumRange) break;
            if(updateLegalMoves(i, j)) break;
        }

        for (let i = x - 1, j = y + 1, range = 0; i >= MIN && j <= MAX; i--, j++, range++) {
            if(range >= movingPiece.maximumRange) break;
            if(updateLegalMoves(i, j)) break;
        }

        for (let i = x - 1, j = y - 1, range = 0; i >= MIN && j >= MIN; i--, j--, range++) {
            if(range >= movingPiece.maximumRange) break;
            if(updateLegalMoves(i, j)) break;
        }
    }

    if(movingPiece.canMoveOrthagonally) {
        for (let i = x + 1, j = y, range = 0; i <= MAX && j <= MAX; i++, range++) {
            if(range >= movingPiece.maximumRange) break;
            if(updateLegalMoves(i, j)) break;
        }

        for (let i = x, j = y - 1, range = 0; i <= MAX && j >= MIN; j--, range++) {
            if(range >= movingPiece.maximumRange) break;
            if(updateLegalMoves(i, j)) break;
        }

        for (let i = x, j = y + 1, range = 0; i >= MIN && j <= MAX; j++, range++) {
            if(range >= movingPiece.maximumRange) break;
            if(updateLegalMoves(i, j)) break;
        }

        for (let i = x - 1, j = y, range = 0; i >= MIN && j >= MIN; i--, range++) {
            if(range >= movingPiece.maximumRange) break;
            if(updateLegalMoves(i, j)) break;
        }
    }

    if(movingPiece.canMoveAsKnight) {
        const possibleMoves = [[x + 1, y + 2],[x + 2, y + 1],[x + 2, y - 1],[x + 1, y - 2],[x - 1, y - 2],[x - 2, y - 1],[x - 2, y + 1],[x - 1, y + 2]];

        if(movingPiece.maximumRange > 2) {
            possibleMoves.forEach((move) => {
                let x = move[0];
                let y = move[1];
    
                if(x <= MAX && y <= MAX && x >= MIN && y >= MIN) {
                    updateLegalMoves(x, y);
                }
            })
        }
    }

    if(movingPiece.canMoveAsRotatedKnight) {
        const possibleMoves = [[x + 2, y + 2],[x, y + 2],[x - 2, y + 2],[x + 2, y],[x - 2, y],[x - 2, y - 2],[x, y - 2],[x + 2, y - 2]];

        if(movingPiece.maximumRange >= 2) {
            possibleMoves.forEach((move) => {
                let x = move[0];
                let y = move[1];
    
                if(x <= MAX && y <= MAX && x >= MIN && y >= MIN) {
                    updateLegalMoves(x, y);
                }
            })
        }
    }

    if(movingPiece.canMoveAsKing) {
        const possibleMoves = [[x + 1, y],[x - 1, y],[x, y + 1],[x, y - 1],[x + 1, y + 1],[x + 1, y - 1],[x - 1, y + 1],[x - 1, y - 1]];

        if(movingPiece.maximumRange > 0) {
            possibleMoves.forEach((move) => {
                let x = move[0];
                let y = move[1];
    
                if(x <= MAX && y <= MAX && x >= MIN && y >= MIN) {
                    updateLegalMoves(x, y);
                }
            })
    
            if(movingPiece.isWhite) {
                if(castlingRights[0] && board[1][0].isEmpty() && !tiles[1][0]?.isBlocking && board[2][0].isEmpty() && !tiles[2][0]?.isBlocking && board[3][0].isEmpty() && !tiles[3][0]?.isBlocking && board[0][0]?.isCastleable) {
                    updateLegalMoves(2, 0);
                }
    
                if(castlingRights[1] && board[5][0].isEmpty() && !tiles[5][0]?.isBlocking && board[6][0].isEmpty()  && !tiles[6][0]?.isBlocking && board[7][0]?.isCastleable) {
                    updateLegalMoves(6, 0);
                }
    
            } else {
                if(castlingRights[2] && board[1][7].isEmpty()  && !tiles[1][7]?.isBlocking && board[2][7].isEmpty()  && !tiles[2][7]?.isBlocking && board[3][7].isEmpty()  && !tiles[3][7]?.isBlocking && board[0][7]?.isCastleable) {
                    updateLegalMoves(2, 7);
                }
    
                if(castlingRights[3] && board[5][7].isEmpty()  && !tiles[5][7]?.isBlocking && board[6][7].isEmpty()  && !tiles[6][7]?.isBlocking && board[7][7]?.isCastleable) {
                    updateLegalMoves(6, 7);
                }
            }
        } 
    }

    if(movingPiece.canMoveAsPawn) {
        if(movingPiece.isWhite) {
            if(movingPiece.maximumRange >= 2) {
                // Double step move option
                if(!includePieceVision && (y <= 1) && board[x][y+1].isEmpty() && board[x][y+2].isEmpty() && !tiles[x][y+1]?.isBlocking) {
                    updateLegalMoves(x, y+2);
                }
            }

            if(movingPiece.maximumRange >= 1) {
                // Move 1 space forward
                if(!includePieceVision && board[x][y+1].isEmpty()) {
                    updateLegalMoves(x, y+1);
                }
                
                // Capturing
                if(includePieceVision || (x+1 <= MAX && areDifferentColours(board[x+1][y+1], board[x][y]))) {
                    updateLegalMoves(x+1, y+1);
                }
    
                if(includePieceVision || (x-1 >= MIN && areDifferentColours(board[x-1][y+1], board[x][y]))) {
                    updateLegalMoves(x-1, y+1);
                }
                
                // En passant
                if((y === 4 && (enPassantSquare[1] === 5 && enPassantSquare[0] === x+1)) || (y === 5 && (enPassantSquare[1] === 6 && enPassantSquare[0] === x+1))) {
                    updateLegalMoves(x+1, y+1);
                }
    
                if((y === 4 && (enPassantSquare[1] === 5 && enPassantSquare[0] === x-1)) ||(y === 5 && (enPassantSquare[1] === 6 && enPassantSquare[0] === x-1))) {
                    updateLegalMoves(x-1, y+1);
                }
            }

    
        } else {
            if(movingPiece.maximumRange >= 2) {
                // Double step move option
                if(!includePieceVision && (y >= 6) && board[x][y-1].isEmpty() && board[x][y-2].isEmpty() && !tiles[x][y-1]?.isBlocking) {
                    updateLegalMoves(x, y-2);
                }
            }

            if(movingPiece.maximumRange >= 1) {
                // Move 1 space forward
                if(!includePieceVision && board[x][y-1].isEmpty()) {
                    updateLegalMoves(x, y-1);
                }
                
                // Capturing
                if(includePieceVision|| (x+1 <= MAX && areDifferentColours(board[x+1][y-1], board[x][y]))) {
                    updateLegalMoves(x+1, y-1);
                }
    
                if(includePieceVision || (x-1 >= MIN && areDifferentColours(board[x-1][y-1], board[x][y]))) {
                    updateLegalMoves(x-1, y-1);
                }
    
                // En passant
                if((y === 3 && (enPassantSquare[1] === 2 && enPassantSquare[0] === x+1)) || (y === 2 && (enPassantSquare[1] === 1 && enPassantSquare[0] === x+1))) {
                    updateLegalMoves(x+1, y-1);
                }
    
                if((y === 3 && (enPassantSquare[1] === 2 && enPassantSquare[0] === x-1)) || (y === 2 && (enPassantSquare[1] === 1 && enPassantSquare[0] === x-1))) {
                    updateLegalMoves(x-1, y-1);
                }
            }
        }
    }

    if(movingPiece.canMoveAsCamel) {
        const possibleMoves = [[x + 1, y + 3],[x + 3, y + 1],[x + 3, y - 1],[x + 1, y - 3],[x - 1, y - 3],[x - 3, y - 1],[x - 3, y + 1],[x - 1, y + 3]];

        if(movingPiece.maximumRange >= 4) {
            possibleMoves.forEach((move) => {
                let x = move[0];
                let y = move[1];
    
                if(x <= MAX && y <= MAX && x >= MIN && y >= MIN) {
                    updateLegalMoves(x, y);
                }
            })
        }
    }

    if(movingPiece.canMoveAnywhere) {
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                if(board[i][j].isEmpty() && tiles[i][j]?.isOccupyable) legalMoves.push([i, j]);
            }
        }
    }

    if(movingPiece.canMoveAsGold) {
        let possibleMoves = movingPiece.isWhite ? [[x + 1, y + 1],[x, y + 1],[x - 1, y + 1],[x + 1, y],[x - 1, y],[x, y - 1]]
                            : [[x - 1, y - 1],[x, y - 1],[x + 1, y - 1],[x - 1, y],[x + 1, y],[x, y + 1]];

        possibleMoves.forEach((move) => {
            let x = move[0];
            let y = move[1];

            if(x <= MAX && y <= MAX && x >= MIN && y >= MIN) {
                updateLegalMoves(x, y);
            }
        })
    }

    if(movingPiece.canMoveAsVillager) {
        if(movingPiece.isWhite) {
            if(movingPiece.maximumRange >= 2) {
                // Double step move option
                if((y <= 1) && board[x][y+1].isEmpty() && !tiles[x][y-1]?.isBlocking) {
                    updateLegalMoves(x, y+2);
                }
            }

            if(movingPiece.maximumRange >= 1) {
                updateLegalMoves(x, y+1);
            }

    
        } else {
            if(movingPiece.maximumRange >= 2) {
                // Double step move option
                if((y >= 6) && board[x][y-1].isEmpty() && !tiles[x][y-1]?.isBlocking) {
                    updateLegalMoves(x, y-2);
                }
            }

            if(movingPiece.maximumRange >= 1) {
                updateLegalMoves(x, y-1);
            }
        }
    }

    return legalMoves;
};


// export const isWhite = (piece: String) => {
//     const info = piece.split(null);
//     piece = info[info.length-1];

//     return piece.toUpperCase() === piece;
// }

interface HandledGameState {
    pieces: (Piece)[][];
    castlingRights: boolean[];
    enPassantSquare: (number | null)[];
}

export const handleCastlingPromotionEnPassant = (nextX: number | null, nextY: number | null, _: number | null, selectedY: number | null, 
                                                 state: ChessState)
                                                 : HandledGameState => {
    const pieces = state.pieces;
    let enPassantSquare = state.enPassantSquare;
    const castlingRights = state.castlingRights;
    
    const movingPiece = nextX !== null && nextY !== null ? pieces[nextX][nextY] : new EmptyPiece();

    // null will be if no piece is moved (i.e. an action was played).
    if(nextX !== null && nextY !== null) {
        // Pawn promotion
        for(let i = 0; i < pieces.length; i++) {
            // bottom row
            let piece = pieces[i][0];

            if(!piece?.isWhite && piece?.canMoveAsPawn) {
                pieces[i][0] = new Queen(false);
            }

            // top row
            piece = pieces[i][7];

            if(piece?.isWhite && piece?.canMoveAsPawn) {
                pieces[i][7] = new Queen(true);
            }
        }

        // Played en passant
        if(movingPiece.canMoveAsPawn && nextX === enPassantSquare[0] && nextY === enPassantSquare[1]) {
            pieces[nextX][nextY-1] = new EmptyPiece();
        }

        if(movingPiece.canMoveAsPawn && nextX === enPassantSquare[0] && nextY === enPassantSquare[1]) {
            pieces[nextX][nextY+1] = new EmptyPiece();
        }

        // En passant square
        enPassantSquare = [null, null];

        if(movingPiece.canMoveAsPawn && ((selectedY === 1 && nextY === 3) || (selectedY === 0 && nextY === 2))) {
            enPassantSquare = [nextX, nextY-1];
        }

        if(movingPiece.canMoveAsPawn && ((selectedY === 6 && nextY === 4) || (selectedY === 7 && nextY === 5))) {
            enPassantSquare = [nextX, nextY+1];
        }

        // Move rook if castling
        if(castlingRights[0] && movingPiece.toString() === "white-king" && nextX === 2 && nextY === 0) {
            const castlingPiece = pieces[0][0];
            pieces[0][0] = new EmptyPiece();
            pieces[3][0] = castlingPiece;
        }

        if(castlingRights[1] && movingPiece.toString() === "white-king" && nextX === 6 && nextY === 0) {
            const castlingPiece = pieces[7][0];
            pieces[7][0] = new EmptyPiece();
            pieces[5][0] = castlingPiece;
        }

        if(castlingRights[2] && movingPiece.toString() === "black-king" && nextX === 2 && nextY === 7) {
            const castlingPiece = pieces[0][7];
            pieces[0][7] = new EmptyPiece();
            pieces[3][7] = castlingPiece;
        }

        if(castlingRights[3] && movingPiece.toString() === "black-king" && nextX === 6 && nextY === 7) {
            const castlingPiece = pieces[7][7];
            pieces[7][7] = new EmptyPiece();
            pieces[5][7] = castlingPiece;
        }
    }
    

    // Update castling rights
    if(movingPiece.toString() === "white-king") {
        castlingRights[0] = false;
        castlingRights[1] = false;
    }

    if(movingPiece.toString() === "black-king") {
        castlingRights[2] = false;
        castlingRights[3] = false;
    }

    if(!pieces[0][0]?.isCastleable) castlingRights[0] = false;
    if(!pieces[7][0]?.isCastleable) castlingRights[1] = false;
    if(!pieces[0][7]?.isCastleable) castlingRights[2] = false;
    if(!pieces[7][7]?.isCastleable) castlingRights[3] = false;

    return {pieces: pieces, castlingRights: castlingRights, enPassantSquare: enPassantSquare};
}

export const generateLegalPlays = (card: string, state: ChessState): number[][] => {
    const actions = getCardAction(card);

    const out: number[][] = [];

    // actions.areaOfUsage.forEach((coord) => {
    //     out.push(coord);
    // })

    // for (let x = 0; x < 8; x++) {
    //     for (let y = 0; y < 8; y++) {
    //         let piece = board[x][y];
    //         const pieceIsWhite = piece?.isWhite;

    //         if (piece.isEmpty()) {
    //             if(actions.canBeUsedOnEmptySquares && tiles[x][y].isEmpty()) out.push([x, y]);
    //             continue;
    //         }

    //         if (whiteToPlay) {
    //             if (
    //                 (actions.canBeUsedOnFriendlyPieces && (pieceIsWhite && !piece.isNeutral))
    //                 || (actions.canBeUsedOnEnemyPieces && (!pieceIsWhite && !piece.isNeutral))
    //                 || (actions.canBeUsedOnNeutralPieces && piece.isNeutral)
    //             ) {
    //                 if (
    //                     (actions.usableOn.length === 0 || actions.usableOn.includes(piece))
    //                     && (actions.unusableOn.length === 0 || !actions.unusableOn.includes(piece))
    //                 ) {
    //                     out.push([x, y]);
    //                 }
    //             }
    //         } else {
    //             if (
    //                 (actions.canBeUsedOnFriendlyPieces && (!pieceIsWhite && !behaviour.isNeutral))
    //                 || (actions.canBeUsedOnEnemyPieces && (pieceIsWhite && !behaviour.isNeutral))
    //                 || (actions.canBeUsedOnNeutralPieces && behaviour.isNeutral)
    //             ) {
    //                 if (
    //                     (actions.usableOn.length === 0 || actions.usableOn.includes(piece))
    //                     && (actions.unusableOn.length === 0 || !actions.unusableOn.includes(piece))
    //                 ) {
    //                     out.push([x, y]);
    //                 }
    //             }
    //         }
    //     }
    // }

    return out;
}



export const decodePiece = (piece: Piece) => {
    if(piece.isEmpty()) return "empty";

    let out = piece.name;

    if(!piece.isNeutral) {
        out = piece.isWhite ? "white-" + out : "black-" + out;
    }

    return out;
}

export const decodeEffects = (piece: Piece) => {
    if(piece.isEmpty()) return [];

    return piece.attachments;
}

export const getCoords = (x: number, y: number) => {
    return `${String.fromCharCode(97 + x)}${y+1}`
}