import express from "express";
import cors from "cors";
import mysql from "mysql2";
import dotenv from "dotenv";
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
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log("server started on port", process.env.PORT);
        });
    }
}
const server = new Server();
server.useMiddlewares();
