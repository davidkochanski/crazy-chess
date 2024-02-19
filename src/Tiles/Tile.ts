import ChessState from "../ChessState";

export class Tile {
    // @ts-ignore
    onPieceLandHere = (currX: number, currY: number, state: ChessState): Promise<ChessState> => {
        return Promise.resolve(state);
    };
    
    // @ts-ignore
    onMoveEnd = (currX: number, currY: number, state: ChessState): Promise<ChessState> => {
        return Promise.resolve(state);
    };

    isBlocking = false;
    isOccupyable = true;

    name = "unknown";

    public isEmpty = (): boolean => {
        return false;
    }

    public toString = (): string => {
        return this.isEmpty() ? "empty" : this.name;
    }

    public equals = (other: Tile): boolean => {
        return this.name === other.name;
    }
}
