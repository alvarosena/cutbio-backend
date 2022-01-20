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

app.get('/', (request, response) => {
  return response.json({ message: "Hello, World" });
})

app.post('/profile', uploadAvatar.single('avatar'), async (request, response) => {
  const avatar_file = request.file?.filename;


  const s3StorageProvider = new S3StorageProvider();

  const result = await s3StorageProvider.save(avatar_file);

  const url = `${process.env.AWS_BUCKET_URL}/${result}`;

  console.log(url);
  return response.status(204).send();
})

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));