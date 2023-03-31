import { v4 as uuidv4 } from 'uuid';

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
        todoList.push(this);
    }

    static fetchAll() {
        return todoList;
    }

    static delete(todoId: string) {
        const deletedTodo = todoList.find((todo: TodoList) => todo.id === todoId)
        todoList = todoList.filter((todo: TodoList) => todo.id !== todoId);
        return deletedTodo;
    }

    static update(todoId: string, title: TextOrNull, description: TextOrNull) {
        const todoIndex: number = todoList.findIndex((todo: TodoList) => todo.id === todoId);

        if (todoIndex > -1) {
            if (title) {
                todoList[todoIndex].title = title;
            }
            if (description) {
                todoList[todoIndex].description = description;
            }

            return todoList[todoIndex];
        }

        return null;
    }
}
