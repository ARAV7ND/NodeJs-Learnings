import { getDB } from "../utils/database";
import { ObjectId } from "mongodb";

class Todo {
    title: string;
    description: string;
    status: string;
    _id?: ObjectId;

    constructor(title: string, description: string, status: string, id: ObjectId | null = null) {
        console.log(id);
        this.title = title;
        this.description = description;
        this.status = status;
        if (id) {
            this._id = id;
        }
    }

    save() {
        const db = getDB();
        let dbOperation;
        if (this._id) {
            dbOperation = db
                .collection('todo')
                .updateOne({ _id: new ObjectId(this._id) }, {
                    $set: {
                        title: this.title,
                        description: this.description,
                        status: this.status
                    }
                },)
        } else {
            dbOperation = db
                .collection('todo')
                .insertOne(this)
        }
        return dbOperation;
    }

    static fetchAll() {
        const db = getDB();
        return db
            .collection('todo')
            .find()
            .toArray()
            .then(todos => {
                console.log(todos);
                return todos
            })
            .catch(error => { throw new Error(error) });
    }

    static findById(todoId: ObjectId) {
        const db = getDB();
        return db
            .collection('todo')
            .find({ _id: new ObjectId(todoId) })
            .next()
            .then(todo => {
                console.log(todo);
                return todo
            })
            .catch(error => { throw new Error(error) });
    }

    static deleteById(todoId: ObjectId) {
        const db = getDB();
        console.log(todoId);
        return db
            .collection('todo')
            .deleteOne({ _id: new ObjectId(todoId) })
            .then(todo => {
                return todo;
            })
            .catch(error => { throw new Error(error) });
    }
}

export default Todo;