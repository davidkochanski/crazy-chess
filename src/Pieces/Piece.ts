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
    description: string = "default description!";
    colour: string = "#008080";
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


    public clone = (): Piece => {
        const nextPiece = new (this.constructor as new (isWhite: boolean) => Piece)(this.isWhite);

        nextPiece.canMoveAsKnight = this.canMoveAsKnight;
        nextPiece.canMoveDiagonally = this.canMoveDiagonally
        nextPiece.canMoveOrthagonally = this.canMoveOrthagonally
        nextPiece.canMoveAsKing = this.canMoveAsKing
        nextPiece.canMoveAsPawn = this.canMoveAsPawn;
        nextPiece.canMoveAsCamel = this.canMoveAsCamel
        nextPiece.canMoveAnywhere = this.canMoveAnywhere;
        nextPiece.canMoveAsGold = this.canMoveAsGold;
        nextPiece.canMoveAsRotatedKnight = this.canMoveAsRotatedKnight
        nextPiece.canMoveAsVillager = this.canMoveAsVillager
        nextPiece.isMovableByPlayer = this.isMovableByPlayer
        nextPiece.isCastleable = this.isCastleable
        nextPiece.isNeutral = this.isNeutral
        nextPiece.isCapturable = this.isCapturable
        nextPiece.isBouncy = this.isBouncy
        nextPiece.canCapture = this.canCapture
        nextPiece.maximumRange = this.maximumRange
    
        nextPiece.name = this.name;
        nextPiece.description = this.description;
        nextPiece.colour = this.colour;
        nextPiece.isWhite = this.isWhite;

        return nextPiece;
    }
}