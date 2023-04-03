import sequelize from "../utils/database"
import { DataTypes } from 'sequelize';
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
});

export default User;