import { getBehaviour, getCardAction, getTileBehaviour, MovementOptions } from "./PiecesBehaviours";

export const areDifferentColours = (attacker: String, defender: String) => {
    const behaviour1 = getBehaviour(attacker);
    const behaviour2 = getBehaviour(defender);

    if(behaviour1.isNeutral || behaviour2.isNeutral) {
        if(!behaviour2.isCapturable) return false;
        return true;
    }

    if(attacker === '-' || defender === '-') return false;
    return (isWhite(attacker) && !isWhite(defender)) || (!isWhite(attacker) && isWhite(defender));
}


export const generateLegalMoves = (x: number, y: number, board: string[][], tiles: string[][], castlingRights: Array<boolean>, enPassantSquare: Array<number | null>) => {
    const MAX = 7;
    const MIN = 0;

    const movingPiece = board[x][y];

    const movements: MovementOptions = getBehaviour(movingPiece);

    const updateLegalMoves = (x: number, y: number) => {
        if(getTileBehaviour(tiles[x][y]).isBlocking) {
            if(getTileBehaviour(tiles[x][y]).isOccupyable) legalMoves.push([x,y]);
            return true;
        }
        if(board[x][y] !== "-") {
            if(!getBehaviour(board[x][y]).isCapturable) return true;
            if(areDifferentColours(board[x][y], movingPiece) || getBehaviour(board[x][y]).isNeutral) {
                legalMoves.push([x,y]);
            }
            return true;
        }
        legalMoves.push([x, y]);
        return false;
    }

    let legalMoves: Array<Array<number>> = [];

    if (movements.canMoveDiagonally) {
        for (let i = x + 1, j = y + 1, range = 0; i <= MAX && j <= MAX; i++, j++, range++) {
            if(range >= movements.maximumRange) break;
            if(updateLegalMoves(i, j)) break;
        }

        for (let i = x + 1, j = y - 1, range = 0; i <= MAX && j >= MIN; i++, j--, range++) {
            if(range >= movements.maximumRange) break;
            if(updateLegalMoves(i, j)) break;
        }

        for (let i = x - 1, j = y + 1, range = 0; i >= MIN && j <= MAX; i--, j++, range++) {
            if(range >= movements.maximumRange) break;
            if(updateLegalMoves(i, j)) break;
        }

        for (let i = x - 1, j = y - 1, range = 0; i >= MIN && j >= MIN; i--, j--, range++) {
            if(range >= movements.maximumRange) break;
            if(updateLegalMoves(i, j)) break;
        }
    }

    if(movements.canMoveOrthagonally) {
        for (let i = x + 1, j = y, range = 0; i <= MAX && j <= MAX; i++, range++) {
            if(range >= movements.maximumRange) break;
            if(updateLegalMoves(i, j)) break;
        }

        for (let i = x, j = y - 1, range = 0; i <= MAX && j >= MIN; j--, range++) {
            if(range >= movements.maximumRange) break;
            if(updateLegalMoves(i, j)) break;
        }

        for (let i = x, j = y + 1, range = 0; i >= MIN && j <= MAX; j++, range++) {
            if(range >= movements.maximumRange) break;
            if(updateLegalMoves(i, j)) break;
        }

        for (let i = x - 1, j = y, range = 0; i >= MIN && j >= MIN; i--, range++) {
            if(range >= movements.maximumRange) break;
            if(updateLegalMoves(i, j)) break;
        }
    }

    if(movements.canMoveAsKnight) {
        const possibleMoves = [[x + 1, y + 2],[x + 2, y + 1],[x + 2, y - 1],[x + 1, y - 2],[x - 1, y - 2],[x - 2, y - 1],[x - 2, y + 1],[x - 1, y + 2]];

        if(movements.maximumRange > 2) {
            possibleMoves.forEach((move) => {
                let x = move[0];
                let y = move[1];
    
                if(x <= MAX && y <= MAX && x >= MIN && y >= MIN) {
                    updateLegalMoves(x, y);
                }
            })
        }
    }

    if(movements.canMoveAsRotatedKnight) {
        const possibleMoves = [[x + 2, y + 2],[x, y + 2],[x - 2, y + 2],[x + 2, y],[x - 2, y],[x - 2, y - 2],[x, y - 2],[x + 2, y - 2]];

        if(movements.maximumRange >= 2) {
            possibleMoves.forEach((move) => {
                let x = move[0];
                let y = move[1];
    
                if(x <= MAX && y <= MAX && x >= MIN && y >= MIN) {
                    updateLegalMoves(x, y);
                }
            })
        }
    }

    if(movements.canMoveAsKing) {
        const possibleMoves = [[x + 1, y],[x - 1, y],[x, y + 1],[x, y - 1],[x + 1, y + 1],[x + 1, y - 1],[x - 1, y + 1],[x - 1, y - 1]];

        if(movements.maximumRange > 0) {
            possibleMoves.forEach((move) => {
                let x = move[0];
                let y = move[1];
    
                if(x <= MAX && y <= MAX && x >= MIN && y >= MIN) {
                    updateLegalMoves(x, y);
                }
            })
    
            if(isWhite(movingPiece)) {
                if(castlingRights[0] && board[1][0] === '-' && board[2][0] === '-' && board[3][0] === '-' && getBehaviour(board[0][0]).isCastleable) {
                    updateLegalMoves(2, 0);
                }
    
                if(castlingRights[1] && board[5][0] === '-' && board[6][0] === '-' && getBehaviour(board[7][0]).isCastleable) {
                    updateLegalMoves(6, 0);
                }
    
            } else {
                if(castlingRights[2] && board[1][7] === '-' && board[2][7] === '-' && board[3][7] === '-' && getBehaviour(board[0][7]).isCastleable) {
                    updateLegalMoves(2, 7);
                }
    
                if(castlingRights[3] && board[5][7] === '-' && board[6][7] === '-' && getBehaviour(board[7][7]).isCastleable) {
                    updateLegalMoves(6, 7);
                }
            }
        } 
    }

    if(movements.canMoveAsPawn) {
        if(isWhite(movingPiece)) {
            if(movements.maximumRange >= 2) {
                if((y <= 1) && board[x][y+1] === '-' && board[x][y+2] === '-' && !getTileBehaviour(tiles[x][y+1]).isBlocking) {
                    updateLegalMoves(x, y+2);
                }
            }

            if(movements.maximumRange >= 1) {
                if(board[x][y+1] === '-') {
                    updateLegalMoves(x, y+1);
                }
                
                if(x+1 <= MAX && areDifferentColours(board[x+1][y+1], board[x][y])) {
                    updateLegalMoves(x+1, y+1);
                }
    
                if(x-1 >= MIN && areDifferentColours(board[x-1][y+1], board[x][y])) {
                    updateLegalMoves(x-1, y+1);
                }
    
                if((y === 4 && (enPassantSquare[1] === 5 && enPassantSquare[0] === x+1)) || (y === 5 && (enPassantSquare[1] === 6 && enPassantSquare[0] === x+1))) {
                    updateLegalMoves(x+1, y+1);
                }
    
                if((y === 4 && (enPassantSquare[1] === 5 && enPassantSquare[0] === x-1)) ||(y === 5 && (enPassantSquare[1] === 6 && enPassantSquare[0] === x-1))) {
                    updateLegalMoves(x-1, y+1);
                }
            }

    
        } else {
            if(movements.maximumRange >= 2) {
                if((y >= 6) && board[x][y-1] === '-' && board[x][y-2] === '-' && !getTileBehaviour(tiles[x][y-1]).isBlocking) {
                    updateLegalMoves(x, y-2);
                }
    
                if(board[x][y-1] === '-') {
                    updateLegalMoves(x, y-1);
                }
            }

            if(movements.maximumRange >= 1) {
                if(x+1 <= MAX && areDifferentColours(board[x+1][y-1], board[x][y])) {
                    updateLegalMoves(x+1, y-1);
                }
    
                if(x-1 >= MIN && areDifferentColours(board[x-1][y-1], board[x][y])) {
                    updateLegalMoves(x-1, y-1);
                }
    
                
                if((y === 3 && (enPassantSquare[1] === 2 && enPassantSquare[0] === x+1)) || (y === 2 && (enPassantSquare[1] === 1 && enPassantSquare[0] === x+1))) {
                    updateLegalMoves(x+1, y-1);
                }
    
                if((y === 3 && (enPassantSquare[1] === 2 && enPassantSquare[0] === x-1)) || (y === 2 && (enPassantSquare[1] === 1 && enPassantSquare[0] === x-1))) {
                    updateLegalMoves(x-1, y-1);
                }
            }
        }
    }

    if(movements.canMoveAsCamel) {
        const possibleMoves = [[x + 1, y + 3],[x + 3, y + 1],[x + 3, y - 1],[x + 1, y - 3],[x - 1, y - 3],[x - 3, y - 1],[x - 3, y + 1],[x - 1, y + 3]];

        if(movements.maximumRange >= 4) {
            possibleMoves.forEach((move) => {
                let x = move[0];
                let y = move[1];
    
                if(x <= MAX && y <= MAX && x >= MIN && y >= MIN) {
                    updateLegalMoves(x, y);
                }
            })
        }
    }

    if(movements.canMoveAnywhere) {
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                if(board[i][j] === "-") legalMoves.push([i, j]);
            }
        }
    }

    if(movements.canMoveAsGold) {
        let possibleMoves = isWhite(movingPiece) ? [[x + 1, y + 1],[x, y + 1],[x - 1, y + 1],[x + 1, y],[x - 1, y],[x, y - 1]]
                            : [[x - 1, y - 1],[x, y - 1],[x + 1, y - 1],[x - 1, y],[x + 1, y],[x, y + 1]];

        possibleMoves.forEach((move) => {
            let x = move[0];
            let y = move[1];

            if(x <= MAX && y <= MAX && x >= MIN && y >= MIN) {
                updateLegalMoves(x, y);
            }
        })
    }

    return legalMoves;
};


export const isWhite = (piece: String) => {
    return piece.toUpperCase() === piece;
}

interface HandledGameState {
    pieces: string[][];
    castlingRights: boolean[];
    enPassantSquare: (number | null)[];
}

export const handleCastlingPromotionEnPassant = (nextX: number | null, nextY: number | null, _: number | null, selectedY: number | null, 
                                                 pieces: string[][], castlingRights: Array<boolean>, enPassantSquare: Array<number | null>)
                                                 : HandledGameState => {
    const movingPiece = nextX !== null && nextY !== null ? pieces[nextX][nextY] : null;

    // null will be if no piece is moved (i.e. an action was played).
    if(nextX !== null && nextY !== null) {
        // Pawn promotion
        for(let i = 0; i < pieces.length; i++) {
            if(pieces[i][0] === 'pawn') {
                pieces[i][0] = 'queen';
            }
            if(pieces[i][7] === 'PAWN') {
                pieces[i][7] = 'QUEEN';
            }
        }

        // Played en passant
        if(movingPiece === 'PAWN' && nextX === enPassantSquare[0] && nextY === enPassantSquare[1]) {
            pieces[nextX][nextY-1] = "-";
        }

        if(movingPiece === 'pawn' && nextX === enPassantSquare[0] && nextY === enPassantSquare[1]) {
            pieces[nextX][nextY+1] = "-";
        }

        // En passant square
        enPassantSquare = [null, null];

        if(movingPiece === 'PAWN' && (selectedY === 1 && nextY === 3) || (selectedY === 0 && nextY === 2)) {
            enPassantSquare = [nextX, nextY-1];
        }

        if(movingPiece === 'pawn' && (selectedY === 6 && nextY === 4) || (selectedY === 7 && nextY === 5)) {
            enPassantSquare = [nextX, nextY+1];
        }

        // Move rook if castling
        if(castlingRights[0] && movingPiece === 'KING' && nextX === 2 && nextY === 0) {
            const castlingPiece = pieces[0][0];
            pieces[0][0] = '-';
            pieces[3][0] = castlingPiece;
        }

        if(castlingRights[1] && movingPiece === 'KING' && nextX === 6 && nextY === 0) {
            const castlingPiece = pieces[7][0];
            pieces[7][0] = '-';
            pieces[5][0] = castlingPiece;
        }

        if(castlingRights[2] && movingPiece === 'king' && nextX === 2 && nextY === 7) {
            const castlingPiece = pieces[0][7];
            pieces[0][7] = '-';
            pieces[3][7] = castlingPiece;
        }

        if(castlingRights[3] && movingPiece === 'king' && nextX === 6 && nextY === 7) {
            const castlingPiece = pieces[7][7];
            pieces[7][7] = '-';
            pieces[5][7] = castlingPiece;
        }
    }
    

    // Update castling rights
    if(movingPiece === 'KING') {
        castlingRights[0] = false;
        castlingRights[1] = false;
    }

    if(movingPiece === 'king') {
        castlingRights[2] = false;
        castlingRights[3] = false;
    }

    if(!getBehaviour(pieces[0][0]).isCastleable) castlingRights[0] = false;
    if(!getBehaviour(pieces[7][0]).isCastleable) castlingRights[1] = false;
    if(!getBehaviour(pieces[0][7]).isCastleable) castlingRights[2] = false;
    if(!getBehaviour(pieces[7][7]).isCastleable) castlingRights[3] = false;

    return {pieces: pieces, castlingRights: castlingRights, enPassantSquare: enPassantSquare};
}

export const generateLegalPlays = (card: string, whiteToPlay: boolean, board: string[][]): number[][] => {
    const actions = getCardAction(card);

    const out: number[][] = [];

    actions.areaOfUsage.forEach((coord) => {
        out.push(coord);
    })

    for(let x = 0; x < 8; x++) {
        for(let y = 0; y < 8; y++) {
            if(actions.canBeUsedOnEmptySquares && board[x][y] === "-") {
                out.push([x, y]);
                continue;
            }

            if(whiteToPlay) {
                if(actions.canBeUsedOnFriendlyPieces && (isWhite(board[x][y])|| getBehaviour(board[x][y]).isNeutral)
                || actions.canBeUsedOnEnemyPieces && (!isWhite(board[x][y]))|| getBehaviour(board[x][y]).isNeutral) {
                    out.push([x,y]);
            }


            } else {
                if(actions.canBeUsedOnFriendlyPieces && (!isWhite(board[x][y])|| getBehaviour(board[x][y]).isNeutral)
                || actions.canBeUsedOnEnemyPieces && (isWhite(board[x][y]))|| getBehaviour(board[x][y]).isNeutral) {
                    out.push([x,y]);
            }
            }
        }
    }

    return out;
    
}


export const decodePiece = (s: String) => {
    if(s === '-') return "empty";

    let out;

    if(getBehaviour(s).isNeutral) {
        out = "";
    } else {
        out = s.toUpperCase() === s ? "white-" : "black-";
    }

    s = s.toLowerCase();

    return out + s;
}
