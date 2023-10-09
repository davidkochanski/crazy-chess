import { getBehaviour, MovementOptions } from "./PiecesBehaviours";

export const generateLegalMoves = (x: number, y: number, board: Array<Array<String>>, castlingRights: Array<boolean>, enPassantSquare: Array<number | null>) => {
    const MAX = 7;
    const MIN = 0;

    const movingPiece = board[x][y];

    const movements: MovementOptions = getBehaviour(movingPiece);

    const areDifferentColours = (piece1: String, piece2: String) => {
        if(getBehaviour(piece1).isNeutral || getBehaviour(piece2).isNeutral) {
            return true;
        }

        if(piece1 === '-' || piece2 === '-') return false;
        return (isWhite(piece1) && !isWhite(piece2)) || (!isWhite(piece1) && isWhite(piece2));
    }

    const updateLegalMoves = (x: number, y: number) => {
        if(board[x][y] !== "-") {
            if(getBehaviour(board[x][y]).isCapturable && areDifferentColours(board[x][y], movingPiece)) {
                legalMoves.push([x,y]);
            }
            return true;
        }
        legalMoves.push([x, y]);
        return false;
    }

    let legalMoves: Array<Array<number>> = [];

    if (movements.canMoveDiagonally) {
        for (let i = x + 1, j = y + 1; i <= MAX && j <= MAX; i++, j++) {
            if(updateLegalMoves(i, j)) break;
        }

        for (let i = x + 1, j = y - 1; i <= MAX && j >= MIN; i++, j--) {
            if(updateLegalMoves(i, j)) break;
        }

        for (let i = x - 1, j = y + 1; i >= MIN && j <= MAX; i--, j++) {
            if(updateLegalMoves(i, j)) break;
        }

        for (let i = x - 1, j = y - 1; i >= MIN && j >= MIN; i--, j--) {
            if(updateLegalMoves(i, j)) break;
        }
    }

    if(movements.canMoveOrthagonally) {
        for (let i = x + 1, j = y; i <= MAX && j <= MAX; i++) {
            if(updateLegalMoves(i, j)) break;
        }

        for (let i = x, j = y - 1; i <= MAX && j >= MIN; j--) {
            if(updateLegalMoves(i, j)) break;
        }

        for (let i = x, j = y + 1; i >= MIN && j <= MAX; j++) {
            if(updateLegalMoves(i, j)) break;
        }

        for (let i = x - 1, j = y; i >= MIN && j >= MIN; i--) {
            if(updateLegalMoves(i, j)) break;
        }
    }

    if(movements.canMoveAsKnight) {
        const possibleMoves = [[x + 1, y + 2],[x + 2, y + 1],[x + 2, y - 1],[x + 1, y - 2],[x - 1, y - 2],[x - 2, y - 1],[x - 2, y + 1],[x - 1, y + 2],
          ];

        possibleMoves.forEach((move) => {
            let x = move[0];
            let y = move[1];

            if(x <= MAX && y <= MAX && x >= MIN && y >= MIN) {
                updateLegalMoves(x, y);
            }
        })
    }

    if(movements.canMoveAsKing) {
        const possibleMoves = [[x + 1, y],[x - 1, y],[x, y + 1],[x, y - 1],[x + 1, y + 1],[x + 1, y - 1],[x - 1, y + 1],[x - 1, y - 1]];

        possibleMoves.forEach((move) => {
            let x = move[0];
            let y = move[1];

            if(x <= MAX && y <= MAX && x >= MIN && y >= MIN) {
                updateLegalMoves(x, y);
            }
        })

        if(isWhite(movingPiece)) {
            if(castlingRights[0] && board[1][0] === '-' && board[2][0] === '-' && board[3][0] === '-') {
                updateLegalMoves(2, 0);
            }

            if(castlingRights[1] && board[5][0] === '-' && board[6][0] === '-') {
                updateLegalMoves(6, 0);
            }

        } else {
            if(castlingRights[2] && board[1][7] === '-' && board[2][7] === '-' && board[3][7] === '-') {
                updateLegalMoves(2, 7);
            }

            if(castlingRights[3] && board[5][7] === '-' && board[6][7] === '-') {
                updateLegalMoves(6, 7);
            }
        }
    }

    if(movements.canMoveAsPawn) {
        if(isWhite(movingPiece)) {
            if((y <= 1) && board[x][y+1] === '-' && board[x][y+2] === '-') {
                legalMoves.push([x, y+2])
            }

            if(board[x][y+1] === '-') {
                legalMoves.push([x, y+1])
            }
            
            if(x+1 <= MAX && areDifferentColours(board[x+1][y+1], board[x][y])) {
                legalMoves.push([x+1, y+1])
            }

            if(x-1 >= MIN && areDifferentColours(board[x-1][y+1], board[x][y])) {
                legalMoves.push([x-1, y+1])
            }

            if(y === 4 && (enPassantSquare[1] === 5 && enPassantSquare[0] === x+1)) {
                legalMoves.push([x+1, y+1])
            }

            if(y === 4 && (enPassantSquare[1] === 5 && enPassantSquare[0] === x-1)) {
                legalMoves.push([x-1, y+1])
            }

        } else {
            if((y >= 6) && board[x][y-1] === '-' && board[x][y-2] === '-') {
                legalMoves.push([x, y-2])
            }

            if(board[x][y-1] === '-') {
                legalMoves.push([x, y-1])
            }

            if(x+1 <= MAX && areDifferentColours(board[x+1][y-1], board[x][y])) {
                legalMoves.push([x+1, y-1])
            }

            if(x-1 >= MIN && areDifferentColours(board[x-1][y-1], board[x][y])) {
                legalMoves.push([x-1, y-1])
            }

            
            if(y === 3 && (enPassantSquare[1] === 2 && enPassantSquare[0] === x+1)) {
                legalMoves.push([x+1, y-1])
            }

            if(y === 3 && (enPassantSquare[1] === 2 && enPassantSquare[0] === x-1)) {
                legalMoves.push([x-1, y-1])
            }
        }
    }

    if(movements.canMoveAsCamel) {
        const possibleMoves = [[x + 1, y + 3],[x + 3, y + 1],[x + 3, y - 1],[x + 1, y - 3],[x - 1, y - 3],[x - 3, y - 1],[x - 3, y + 1],[x - 1, y + 3]];

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
    pieces: String[][];
    castlingRights: boolean[];
    enPassantSquare: (number | null)[];
}

export const handleCastlingPromotionEnPassant = (nextX: number, nextY: number, _: number, selectedY: number, 
                                                 pieces: Array<Array<String>>, castlingRights: Array<boolean>, enPassantSquare: Array<number | null>)
                                                 : HandledGameState => {
    const movingPiece = pieces[nextX][nextY];

    // Pawn promotion
    for(let i = 0; i < pieces.length; i++) {
        if(pieces[i][0] === 'p') {
            pieces[i][0] = 'q';
        }
        if(pieces[i][7] === 'P') {
            pieces[i][7] = 'Q';
        }
    }

    // Played en passant
    if(movingPiece === 'P' && nextX === enPassantSquare[0] && nextY === enPassantSquare[1]) {
        pieces[nextX][nextY-1] = "-";
    }

    if(movingPiece === 'p' && nextX === enPassantSquare[0] && nextY === enPassantSquare[1]) {
        pieces[nextX][nextY+1] = "-";
    }

    // En passant square
    enPassantSquare = [null, null];

    if(movingPiece === 'P' && selectedY === 1 && nextY === 3) {
        enPassantSquare = [nextX, nextY-1];
    }

    if(movingPiece === 'p' && selectedY === 6 && nextY === 4) {
        enPassantSquare = [nextX, nextY+1];
    }

    // Move rook if castling
    if(castlingRights[0] && movingPiece === 'K' && nextX === 2 && nextY === 0) {
        pieces[0][0] = '-';
        pieces[3][0] = 'R';
    }

    if(castlingRights[1] && movingPiece === 'K' && nextX === 6 && nextY === 0) {
        pieces[7][0] = '-';
        pieces[5][0] = 'R';
    }

    if(castlingRights[2] && movingPiece === 'k' && nextX === 2 && nextY === 7) {
        pieces[0][7] = '-';
        pieces[3][7] = 'r';
    }

    if(castlingRights[3] && movingPiece === 'k' && nextX === 6 && nextY === 7) {
        pieces[7][7] = '-';
        pieces[5][7] = 'r';
    }

    // Update castling rights
    if(movingPiece === 'K') {
        castlingRights[0] = false;
        castlingRights[1] = false;
    }

    if(movingPiece === 'k') {
        castlingRights[2] = false;
        castlingRights[3] = false;
    }

    if(pieces[0][0] !== 'R') castlingRights[0] = false;
    if(pieces[7][0] !== 'R') castlingRights[1] = false;
    if(pieces[0][7] !== 'r') castlingRights[2] = false;
    if(pieces[7][7] !== 'r') castlingRights[3] = false;

    return {pieces: pieces, castlingRights: castlingRights, enPassantSquare: enPassantSquare};
}

export const decodePiece = (s: String) => {
    if(s.length !== 1) return;

    let out = s.toUpperCase() === s ? "white-" : "black-";

    s = s.toLowerCase();

    switch(s) {
        case 'k':
            out += 'king';
            break;
        case 'q':
            out += 'queen';
            break;
        case 'r':
            out += 'rook';
            break;
        case 'b':
            out += 'bishop';
            break;
        case 'n':
            out += 'knight';
            break;
        case 'p':
            out += 'pawn';
            break;
        case 'c':
            out += 'camel';
            break;
        case 'a':
            out += 'amazon';
            break;
        case 'l':
            out += 'lisek';
            break;
        case 'f':
            return 'fox';
        case '-':
            return 'empty';
        default:
            return 'unknown';
    }

    return out;
}
