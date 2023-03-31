import { v4 as uuidv4 } from 'uuid';
import db from '../utils/database'

export interface TodoList {
    id: string;
    title: string;
    description: string;
}

let todoList: TodoList[] = [];

type TextOrNull = string | null;

export class Todo {
    id: string;
    title: string;
    description: string;

    constructor(title: string, description: string) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
    }

    save() {
        return db.execute("INSERT INTO todo (id, title, description) VALUES (?, ?, ?)",
            [this.id, this.title, this.description]);
    }

    static fetchAll() {
        return db.execute("SELECT * FROM todo");
    }

    static fetchById(todoId: string) {
        return db.execute("SELECT * FROM todo WHERE id =?", [todoId]);
    }

    static delete(todoId: string) {
        return db.execute("DELETE FROM todo WHERE id =?", [todoId]);
    }

    static update(todoId: string, title: TextOrNull, description: TextOrNull) {
        return db.execute("UPDATE todo SET title =?, description =? WHERE id =?",
            [title, description, todoId]);
    }
}
