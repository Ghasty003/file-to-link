"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
const imageRoute_1 = __importDefault(require("./routes/imageRoute"));
dotenv_1.default.config();
exports.db = mysql2_1.default.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.listen();
    }
    useMiddlewares() {
        this.app.use((0, cors_1.default)());
    }
    initializeRoutes() {
        this.app.use("/api/image", imageRoute_1.default);
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
