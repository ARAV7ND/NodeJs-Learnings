import express from 'express';
import dotenv from 'dotenv';
import mongoConnect from './src/utils/database';
import todoRoutes from './src/routes/todos';
import userRouters from './src/routes/users';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(todoRoutes)
app.use(userRouters);
mongoConnect(() => {
    app.listen(3000);
})
