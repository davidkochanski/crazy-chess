import ChessState from "../ChessState";

export class Piece {

    constructor (isWhite: boolean) {
        this.isWhite = isWhite
    }

    // @ts-ignore
    onMoveEnd = (currX: number, currY: number, state: ChessState): Promise<ChessState> => Promise.resolve(state);
    // @ts-ignore
    onCapture = (currX: number, currY: number, state: ChessState): ChessState => state;
    // @ts-ignore
    onGetsCaptured = (currX: number, currY: number, state: ChessState): ChessState => state;
    // @ts-ignore
    onMove = (currX: number, currY: number, state: ChessState): ChessState => state;

    canMoveAsKnight: boolean = false;
    canMoveDiagonally: boolean = false;
    canMoveOrthagonally: boolean = false;
    canMoveAsKing: boolean = false;
    canMoveAsPawn: boolean = false;
    canMoveAsCamel: boolean = false;
    canMoveAnywhere: boolean = false;
    canMoveAsGold: boolean = false;
    canMoveAsRotatedKnight: boolean = false;
    canMoveAsVillager: boolean = false;
    isMovableByPlayer: boolean = true;
    isCastleable: boolean = false;
    isNeutral: boolean = false;
    isCapturable: boolean = true;
    isBouncy: boolean = false;
    canCapture: boolean = true;
    maximumRange: number = Infinity;

    name: string = "unknown";
    isWhite: boolean;
    attachments: string[] = [];
    
    public isEmpty = (): boolean => {
        return false;
    }

    public toString = (): string => {
        if(this.isNeutral) return this.name;
        if(this.isEmpty()) return "empty";
        
        return `${this.isWhite ? "white" : "black"}-${this.name}`
    }

    public equals = (other: Piece): boolean => {
        return this.name === other.name;
    }
}