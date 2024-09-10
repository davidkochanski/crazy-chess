import { z } from "zod";
import Users from "../models/Users";
import appAssert from "../utils/appAssert";
import catchErrorsAsynchronously from "../utils/catchErrorsAsynchonously";
import { CardsDocument } from "../models/Cards";

export const userHandler = catchErrorsAsynchronously(
    async (req, res) => {
        // get the user from the database, assume it's already verified and all that
        const user = await Users.findById(req.userId);

        if(user) {
            return res.status(200).json(user.omitPassword());
        } else {
            return res.status(404).json(null);
        }
    }
)


const setNameSchema = z.object({
    newName: z.string().min(1).max(31),
    userId: z.string() // THIS IS AUTOMATICALLY GENERATED BY THE PROTECTWITHAUTH MIDDLEWARE. 
                       // SAME WITH SESSION (not needed here tho)
})


export const setNameHandler = catchErrorsAsynchronously(
    async (req, res) => {
        const request = setNameSchema.parse({...req.body, userId: req.userId }); // the userId from middleware

        const user = await Users.findById(request.userId)
        appAssert(user, 404, "User not found.");

        user.name = request.newName; // obv this should be more sanitary
        await user.save();
        appAssert(user, 500, "Something went wrong saving the name.");

        return res.status(200).json({ message: "Successfully updated name." })
    }
)

export const addDummyCardHandler = catchErrorsAsynchronously(
    async (req, res) => {
        const user = await Users.findById(req.userId);
        appAssert(user, 404, "User not found.");
        
        user.cards.push({"canMoveAsKnight":false,"canMoveDiagonally":false,"canMoveOrthagonally":false,"canMoveAsKing":false,"canMoveAsPawn":true,"canMoveAsCamel":false,"canMoveAnywhere":false,"canMoveAsGold":false,"canMoveAsRotatedKnight":false,"canMoveAsVillager":false,"isMovableByPlayer":true,"isCastleable":false,"isNeutral":false,"isCapturable":true,"isBouncy":false,"canCapture":true,"canEnPassant":true,"isRoyal":false,"name":"Pawn","description":"Basic chessmen. Can move forwards, sometimes twice, can promote, and can even en passant.","image":"pawn.png","colour":"#E57373","isWhite":true,"id":1,"isEmpty":false} as CardsDocument);

        await user.save();

        return res.status(200).json( {message: "Added dummy card." } )
    }
)

export const setCardHandler = catchErrorsAsynchronously(
    async (req, res) => {
        const user = await Users.findById(req.userId);
        appAssert(user, 404, "User not found.");
        

        user.cards = req.body.cards;

        console.log(req.body);

        await user.save();

        return res.status(200).json( {message: "Set cards." } )
    }
)