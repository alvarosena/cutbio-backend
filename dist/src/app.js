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
const S3StorageProvider_1 = require("./shared/container/Providers/StorageProvider/S3StorageProvider");
const app = (0, express_1.default)();
const uploadAvatar = (0, multer_1.default)(upload_1.default);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.routes);
app.get('/', (request, response) => {
    return response.json({ message: "Hello, World" });
});
app.post('/profile', uploadAvatar.single('avatar'), async (request, response) => {
    var _a;
    const avatar_file = (_a = request.file) === null || _a === void 0 ? void 0 : _a.filename;
    const s3StorageProvider = new S3StorageProvider_1.S3StorageProvider();
    const result = await s3StorageProvider.save(avatar_file);
    const url = `${process.env.AWS_BUCKET_URL}/${result}`;
    console.log(url);
    return response.status(204).send();
});
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
