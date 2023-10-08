export type MovementOptions = {
    canMoveDiagonally: boolean;
    canMoveOrthagonally: boolean;
    canMoveAsKnight: boolean;
    canMoveAsKing: boolean;
    canMoveAsPawn: boolean;
    canMoveAsCamel: boolean;
}

export const isWhite = (piece: String) => {
    return piece.toUpperCase() === piece;
}

export const getMovementOptions = (piece: String) => {

    piece = piece.toLowerCase();

    let options: MovementOptions = { canMoveAsKnight: false, canMoveDiagonally: false, canMoveOrthagonally: false, canMoveAsKing: false, canMoveAsPawn: false, canMoveAsCamel: false };

    switch (piece) {
        case "b":
            options.canMoveDiagonally = true;
            break;
        case "q":
            options.canMoveDiagonally = true;
            options.canMoveOrthagonally = true;
            break;
        case "r":
            options.canMoveOrthagonally = true;
            break;
        case "n":
            options.canMoveAsKnight = true;
            break;
        case "k":
            options.canMoveAsKing = true;
            break;
        case "p":
            options.canMoveAsPawn = true;
            break;
        case "a":
            options.canMoveAsKnight = true;
            options.canMoveDiagonally = true;
            options.canMoveOrthagonally = true;
            break;
        case "l":
            options.canMoveAsKnight = true;
            options.canMoveDiagonally = true;
            options.canMoveOrthagonally = true;
            options.canMoveAsPawn = true;
            break;
        case "c":
            options.canMoveAsCamel = true;
            break;
    }

    return options;
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
        case '-':
            return 'empty';
        default:
            return 'unknown';
    }

    return out;
}
