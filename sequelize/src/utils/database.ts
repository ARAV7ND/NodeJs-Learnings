import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();


const sequelize = new Sequelize(process.env.DB!, process.env.DB_USER!, process.env.DB_PASSWORD, {
    dialect: "mysql",
    host: "localhost"
});


export default sequelize;


