export type MovementOptions = {
    action: (currX: number, currY: number, pieces: Array<Array<String>>) => Array<Array<String>>,
    canMoveDiagonally: boolean;
    canMoveOrthagonally: boolean;
    canMoveAsKnight: boolean;
    canMoveAsKing: boolean;
    canMoveAsPawn: boolean;
    canMoveAsCamel: boolean;
    isMovableByPlayer: boolean;
    isNeutral: boolean;
    isCapturable: boolean;
}


export const getBehaviour = (piece: String) => {

    piece = piece.toLowerCase();

    let options: MovementOptions = {
        action: (currX: number, currY: number, pieces: Array<Array<String>>) => {return pieces},
        canMoveAsKnight: false, 
        canMoveDiagonally: false, 
        canMoveOrthagonally: false, 
        canMoveAsKing: false, 
        canMoveAsPawn: false, 
        canMoveAsCamel: false, 
        isMovableByPlayer: true, 
        isNeutral: false, 
        isCapturable: true
    };

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
            options.canMoveAsCamel = true;
            options.canMoveDiagonally = true;
            options.canMoveOrthagonally = true;
            break;
        case "c":
            options.canMoveAsCamel = true;
            break;
        case "f":
            options.isMovableByPlayer = false;
            options.isNeutral = true;
            options.action = (currX: number, currY: number, pieces: Array<Array<String>>) => {
                const x = Math.floor(Math.random() * 8);
                const y = Math.floor(Math.random() * 8);
                
                pieces[currX][currY] = '-';

                pieces[x][y] = 'f';

                return pieces;
            }
    }

    return options;
}