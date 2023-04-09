import { getDB } from "../utils/database";
import { ObjectId } from 'mongodb';

class User {
    name: string;
    email: string;
    _id?: ObjectId;
    constructor(name: string, email: string, id: ObjectId | null = null) {
        this.name = name;
        this.email = email;
        if (id) {
            this._id = id;
        }
    }

    save() {
        const db = getDB();
        let dbOperation;
        if (this._id) {
            dbOperation = db
                .collection('users')
                .updateOne({ _id: new ObjectId(this._id) }, {
                    $set: {
                        name: this.name,
                        email: this.email
                    }
                });
        } else {
            dbOperation = db
                .collection('users')
                .insertOne(this)
        }
        return dbOperation;
    }

    static getAll() {
        const db = getDB();
        return db.collection('users')
            .find()
            .toArray()
            .then((result) => {
                console.log(result);
                return result;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static getById(userId: ObjectId) {
        const db = getDB();
        return db
            .collection('users')
            .find({ _id: new ObjectId(userId) })
            .next()
            .then((result) => {
                return result;
            })
    }

    static deleteUser(userId: ObjectId) {
        const db = getDB();
        return db
            .collection('users')
            .deleteOne({ _id: new ObjectId(userId) })
            .then((result) => {
                return result;
            }).catch((error) => {
                return error.message;
            });
    }
}

export default User;