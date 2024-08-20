import { Router } from "express";
import { registerHandler } from "../controllers/authController";
import { loginHandler } from "../controllers/authController";

const authRoutes = Router(); // /auth

// define the routes and pass them onto a contoller

// technically /auth/register, since we added /auth prefix in index.ts
authRoutes.post("/register", registerHandler)
authRoutes.post("/login", loginHandler)

export default authRoutes;