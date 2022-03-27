import 'reflect-metadata';
import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { routes } from './routes';
import uploadConfig from "./config/upload";
import './shared/container';
import multer from 'multer';

const app = express();
const uploadAvatar = multer(uploadConfig);

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      message: err.message,
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});


app.get('/', (request, response) => {
  return response.json({ message: "Hello, World" });
})

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));