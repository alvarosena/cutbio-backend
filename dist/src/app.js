"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const upload_1 = __importDefault(require("./config/upload"));
require("./shared/container");
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
const uploadAvatar = (0, multer_1.default)(upload_1.default);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.routes);
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", '*');
    response.header("Access-Control-Allow-Credentials");
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    response.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
app.get('/', (request, response) => {
    return response.json({ message: "Hello, World" });
});
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
