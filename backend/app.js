import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connection from "./database/connection.js";
import userRouter from "./routes/user.routes.js";
import noteRouter from "./routes/note.routes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

dotenv.config({
    path: "./config.env"
});

app.use(cors({
    origin: "http://localhost:5173",
    methods: [ "GET", "POST", "PUT", "DELETE" ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", noteRouter);

connection();

export default app;