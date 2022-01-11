import 'reflect-metadata';
import express from 'express';
import { routes } from './routes';
import './shared/container';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
  return response.json({ message: "Hello, World" });
})

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));