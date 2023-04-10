
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
    },
    todo: {
        todos: [
            {
                todoId: {
                    type: Schema.Types.ObjectId,
                    ref: "Todo"
                }
            }
        ]
    }
});

export default model("User", userSchema);