import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import errorHandler from "./middleware/errorHandler";
import catchErrorsAsynchronously from "./utils/catchErrorsAsynchonously";
import authRoutes from "./routes/authRoutes";
import { protectWithAuth } from "./middleware/protectWithAuth";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: APP_ORIGIN,
        credentials: true,
    })
);
app.use(cookieParser());


app.get("/", catchErrorsAsynchronously(async (_, res, nextFn) => {
    return res.status(200).json({
        status: "healthy!",
    });
}));

app.use("/auth", authRoutes);

app.use("/user", userRoutes);

app.use(errorHandler);


app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT} in ${NODE_ENV} environment`);
    await connectToDatabase();
});
