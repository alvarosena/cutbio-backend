import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

const uploadsFolder = resolve(__dirname, "..", "..", "uploads");

export default {
  uploadsFolder,
  storage: multer.diskStorage({
    destination: uploadsFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};