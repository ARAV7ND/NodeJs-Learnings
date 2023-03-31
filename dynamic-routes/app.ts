import express from 'express';
import todoRoutes from './src/routes/todos';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(todoRoutes);

app.listen(process.env.PORT);