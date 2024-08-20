import { Router } from "express";
import { registerHandler } from "../controllers/authController";

const authRoutes = Router(); // /auth

// define the routes and pass them onto a contoller

// technically /auth/register, since we added /auth prefix in index.ts
authRoutes.post("/register", registerHandler)

export default authRoutes;