import express from 'express';
import dotenv from 'dotenv';
import todoRoutes from './src/routes/todos';
import userRouters from './src/routes/users';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from './src/models/users';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use('/', (req: any, res, next) => {
    User.findOne({ name: 'admin' })
        .then(user => {
            console.log(user);
            req.userData = user;
            next();
        })
        .catch(err => console.log(err));
});


app.use(todoRoutes)
app.use(userRouters);

mongoose
    .connect('mongodb://localhost:27017/todo-list')
    .then(result => {
        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'admin',
                        email: 'admin@test.com',
                        todo: {
                            todos: []
                        }
                    });
                    user.save();
                }
            });
    })
    .then((result) => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });