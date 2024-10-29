import express from 'express';
import rootRoute from './routes/index.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rootRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
