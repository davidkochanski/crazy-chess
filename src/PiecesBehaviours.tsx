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
    maximumRange: number;
}


export const getBehaviour = (piece: String) => {

    piece = piece.toLowerCase();

    let options: MovementOptions = {
        // @ts-ignore
        action: (currX: number, currY: number, pieces: Array<Array<String>>) => {return pieces},
        canMoveAsKnight: false, 
        canMoveDiagonally: false, 
        canMoveOrthagonally: false, 
        canMoveAsKing: false, 
        canMoveAsPawn: false, 
        canMoveAsCamel: false, 
        isMovableByPlayer: true, 
        isNeutral: false, 
        isCapturable: true,
        maximumRange: Infinity
    };

    switch (piece) {
        case "bishop":
            options.canMoveDiagonally = true;
            break;
        case "queen":
            options.canMoveDiagonally = true;
            options.canMoveOrthagonally = true;
            break;
        case "rook":
            options.canMoveOrthagonally = true;
            break;
        case "knight":
            options.canMoveAsKnight = true;
            break;
        case "king":
            options.canMoveAsKing = true;
            break;
        case "pawn":
            options.canMoveAsPawn = true;
            break;
        case "amazon":
            options.canMoveAsKnight = true;
            options.canMoveDiagonally = true;
            options.canMoveOrthagonally = true;
            break;
        case "lisek":
            options.canMoveAsKnight = true;
            options.canMoveAsCamel = true;
            options.canMoveDiagonally = true;
            options.canMoveOrthagonally = true;
            break;
        case "camel":
            options.canMoveAsCamel = true;
            break;
        case "knook":
            options.canMoveAsKnight = true;
            options.canMoveOrthagonally = true;
            break;
        case "archbishop":
            options.canMoveAsKnight = true;
            options.canMoveDiagonally = true;
            break;
        case "fox":
            options.isMovableByPlayer = false;
            options.isNeutral = true;
            options.isCapturable = true;
            options.action = (currX: number, currY: number, pieces: Array<Array<String>>) => {
                const x = Math.floor(Math.random() * 8);
                const y = Math.floor(Math.random() * 8);

                console.log(x, y);
                
                pieces[currX][currY] = '-';

                pieces[x][y] = 'FOX';

                return pieces;
            }
    }

    return options;
}



export type TileOptions = {
    isBlocking: boolean;
    isOccupyable: boolean;
}

export const getTileBehaviour = (tile: String) => {
    tile = tile.toLowerCase();

    let options: TileOptions = {
        isBlocking: false,
        isOccupyable: true
    }

    switch(tile) {
        case "wall":
            options.isBlocking = true;
            break;
    }

    return options;

}