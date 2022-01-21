"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3StorageProvider = void 0;
const aws_sdk_1 = require("aws-sdk");
const fs_1 = __importDefault(require("fs"));
const mime_1 = __importDefault(require("mime"));
const path_1 = require("path");
const upload_1 = __importDefault(require("../../../../config/upload"));
class S3StorageProvider {
    constructor() {
        this.client = new aws_sdk_1.S3({
            region: process.env.AWS_BUCKET_REGION,
        });
    }
    async save(file) {
        const originalName = (0, path_1.resolve)(upload_1.default.uploadsFolder, file);
        const fileContent = await fs_1.default.promises.readFile(originalName);
        const ContentType = mime_1.default.getType(originalName);
        await this.client.putObject({
            Bucket: `${process.env.AWS_BUCKET}`,
            Key: file,
            ACL: "public-read",
            Body: fileContent,
            ContentType
        }).promise();
        await fs_1.default.promises.unlink(originalName);
        return file;
    }
    async delete(file) {
        await this.client.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}`,
            Key: file,
        }).promise();
    }
}
exports.S3StorageProvider = S3StorageProvider;
