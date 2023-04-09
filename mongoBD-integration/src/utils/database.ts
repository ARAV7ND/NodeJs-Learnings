import dotenv from 'dotenv';
import { Db, MongoClient } from 'mongodb';

dotenv.config();

const url = 'mongodb://localhost:27017/';
let _db: Db;

const client = new MongoClient(url);

const mongoConnect = (callback: any) => {
    client.connect()
        .then((client) => {
            _db = client.db(process.env.DATABASE);
            callback();
        })
        .catch((err) => {
            console.log(err);
            throw err;
        })
}


export const getDB = () => {
    if (_db) {
        return _db;
    }
    throw new Error('DB not connected');
}

export default mongoConnect;



