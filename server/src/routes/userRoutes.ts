import { Router } from "express";
import userHandler from "../controllers/userController";

const userRoutes = Router();

userRoutes.get("/", userHandler); // NO /user in the first param.
                                  // we already put /user in the index.ts file.
                                  // so this is just /user, NOT /user/user.

export default userRoutes;