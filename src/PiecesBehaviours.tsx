export type MovementOptions = {
    onMoveEnd: (currX: number, currY: number, pieces: string[][]) => string[][],
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
        onMoveEnd: (currX: number, currY: number, pieces: string[][]) => {return pieces},
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
            options.onMoveEnd = (currX: number, currY: number, pieces: string[][]) => {
                const x = Math.floor(Math.random() * 8);
                const y = Math.floor(Math.random() * 8);
                
                pieces[currX][currY] = '-';

                pieces[x][y] = 'FOX';

                return pieces;
            }
            break;
        case "snake":
            options.isMovableByPlayer = false;
            options.isNeutral = true;
            options.isCapturable = true;

            options.onMoveEnd = (currX: number, currY: number, pieces: string[][]) => {
                let x, y;
                
                // Wow, an actual usecase for a do while...
                do {
                    const deltaX = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
                    const deltaY = Math.floor(Math.random() * 3) - 1;
                
                    x = currX + deltaX;
                    y = currY + deltaY;
                } while (!(x >= 0 && x <= 7 && y >= 0 && y <= 7));
                
                pieces[currX][currY] = "-";
                pieces[x][y] = "SNAKE";
                
                return pieces;
            }
    }

    return options;
}



export type TileOptions = {
    isBlocking: boolean;
    isOccupyable: boolean;
    onPieceLandHere: (currX: number, currY: number, pieces: string[][], tiles: string[][]) => string[][],
}

export const getTileBehaviour = (tile: String) => {
    tile = tile.toLowerCase();

    let options: TileOptions = {
        // @ts-ignore
        onPieceLandHere: (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {return pieces},
        isBlocking: false,
        isOccupyable: true,

    }

    switch (tile) {
        case "wall":
            options.isBlocking = true;
            break;

        case "blue-portal":
        case "orange-portal":
            options.onPieceLandHere = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {
                const portalType = tile === "blue-portal" ? "orange-portal" : "blue-portal";
                let destX, destY;

                tiles.forEach((row, x) => {
                    row.forEach((tile, y) => {
                        if (tile === portalType) {
                            destX = x;
                            destY = y;
                        }
                    });
                });

                if(destX === undefined || destY === undefined) return pieces;
                const movingPiece = pieces[currX][currY];

                pieces[currX][currY] = "-";
                pieces[destX][destY] = movingPiece;

                return pieces;
            };
            break;
    }

    return options;

}