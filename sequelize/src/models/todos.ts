import { DataTypes } from "sequelize";
import sequelize from "../utils/database";

const Todo = sequelize.define('todo', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
})

export default Todo;