import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";
import imageRoute from "./routes/imageRoute";
dotenv.config();
export const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
class Server {
    constructor() {
        this.app = express();
        this.listen();
    }
    useMiddlewares() {
        this.app.use(cors());
    }
    initializeRoutes() {
        this.app.use("/api/image", imageRoute);
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log("server started on port", process.env.PORT);
        });
    }
}
const server = new Server();
server.useMiddlewares();
server.initializeRoutes();
