import express from 'express';
import todoRoutes from './src/routes/todos';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import sequelize from './src/utils/database';
import Todo from './src/models/todos';
import User from './src/models/user';

dotenv.config();

const app = express();
app.use((req: any, res, next) => {
    User.findByPk(1)
        .then((user: any) => {
            if (user) {
                req.user = user;
            }

            next();
        })
        .catch((error) => {
            console.log(error);
        });

})
app.use(bodyParser.json());
app.use(todoRoutes);

Todo.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE',
})

User.hasMany(Todo);

sequelize.sync()
    .then((result) => {
        return User.findByPk(1);
    }).then((user) => {
        if (!user) {
            return User.create({
                name: 'admin',
                email: 'kenaa@example.com'
            });
        }
        return user;
    }).then(user => {
        app.listen(process.env.PORT);
    })
    .catch((err) => {
        console.log(err);
    });