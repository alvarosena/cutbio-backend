import 'reflect-metadata';
import 'dotenv/config';
import express, { request } from 'express';
import cors from 'cors';
import { routes } from './routes';
import uploadConfig from "./config/upload";
import './shared/container';
import multer from 'multer';
import { S3StorageProvider } from './shared/container/Providers/StorageProvider/S3StorageProvider';

const app = express();
const uploadAvatar = multer(uploadConfig);

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", '*');
  response.header("Access-Control-Allow-Credentials");
  response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  response.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

app.get('/', (request, response) => {
  return response.json({ message: "Hello, World" });
})

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));