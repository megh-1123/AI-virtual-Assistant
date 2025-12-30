import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

const port = process.env.PORT || 5000;


connectDb()
  .then(() => {
        console.log("MongoDB connected");
        
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
  })
  .catch((err) => {
        console.log("Error connecting DB:", err);
  });
