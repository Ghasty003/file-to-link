import express, { Application } from "express";
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
    private app: Application;
    
    public constructor() {
        this.app = express();
        this.listen();
    }

    public useMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json({ limit: "50mb" }))
    }

    public initializeRoutes() {
        this.app.use("/api/image", imageRoute);
    }

    private listen() {
        this.app.listen(process.env.PORT, () => {
            console.log("server started on port", process.env.PORT);
        })
    }
}


const server = new Server();

server.useMiddlewares();
server.initializeRoutes();