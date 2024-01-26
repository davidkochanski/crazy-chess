export class Piece {

    constructor (isWhite: boolean) {
        this.isWhite = isWhite
    }

    // @ts-ignore
    onMoveEnd = (currX: number, currY: number, pieces: (Piece)[][]): (Piece)[][] => pieces;
    // @ts-ignore
    onCapture = (currX: number, currY: number, pieces: (Piece)[][]): (Piece)[][] => pieces;
    // @ts-ignore
    onGetsCaptured = (currX: number, currY: number, pieces: (Piece)[][]): (Piece)[][] => pieces;

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
    isBouncy: boolean = true;
    canCapture: boolean = true;
    maximumRange: number = Infinity;

    name: string = "empty";
    isWhite: boolean;
    attachments: string[] = [];
    isEmpty: boolean = false;
    

    public toString = (): string => {
        if(this.isNeutral || this.name == "empty") return this.name;
        
        return `${this.isWhite ? "white" : "black"}-${this.name}`
    }

    public equals = (other: Piece): boolean => {
        return this.name === other.name;
    }
}