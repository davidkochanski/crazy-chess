import { Router } from "express";
import { addDummyCardHandler, setCardHandler, setNameHandler } from "../controllers/userController";
import { userHandler } from "../controllers/userController";

const userRoutes = Router();

userRoutes.get("/", userHandler); // NO /user in the first param.
                                  // we already put /user in the index.ts file.
                                  // so this is just /user, NOT /user/user.

userRoutes.patch("/setName", setNameHandler)
userRoutes.post("/addDummyCard", addDummyCardHandler)
userRoutes.patch("/setCards", setCardHandler)

export default userRoutes;