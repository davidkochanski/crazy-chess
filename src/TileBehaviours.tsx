export type TileOptions = {
    isBlocking: boolean;
    isOccupyable: boolean;
    onPieceLandHere: (currX: number, currY: number, pieces: string[][], tiles: string[][]) => string[][],
    onMoveEnd: (currX: number, currY: number, pieces: string[][], tiles: string[][]) => string[][]
}

export const getTileBehaviour = (tile: String) => {
    tile = tile.toLowerCase();

    let options: TileOptions = {
        // @ts-ignore
        onPieceLandHere: (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {return pieces},
        // @ts-ignore
        onMoveEnd: (currX: number, currY: number, pieces: string[][], tiles: string[][]) => pieces,
        isBlocking: false,
        isOccupyable: true,

    }

    switch (tile) {
        case "wall":
            options.isBlocking = true;
            options.isOccupyable = false;
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

        case "trap":
            options.isBlocking = true;
            options.isOccupyable = true;
            options.onMoveEnd = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {
                if(pieces[currX][currY] !== "-") {
                    pieces[currX][currY] = "-";
                    tiles[currX][currY] = "-";
                } 

                return pieces;
            }
            break;
        case "bomb":
            options.isBlocking = true;
            options.isOccupyable = true;
            options.onMoveEnd = (currX: number, currY: number, pieces: string[][], tiles: string[][]) => {
                if(pieces[currX][currY] !== "-") {
                    pieces[currX][currY] = "-";

                    for (let i = Math.max(0, currX - 1); i <= Math.min(7, currX + 1); i++) {
                        for (let j = Math.max(0, currY - 1); j <= Math.min(7, currY + 1); j++) {
                            pieces[i][j] = "-";
                        }
                    }

                    tiles[currX][currY] = "-";
                } 

                return pieces;
            }
    }

    return options;

}

