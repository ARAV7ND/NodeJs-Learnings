import { Todo } from "../models/todos";
import { Request, Response, NextFunction } from "express";


type RequestParams = { id: string };

export const getTodoList = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ todo: Todo.fetchAll() });
}

export const addTodo = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as Todo;
    const todo = new Todo(body.title, body.description);
    todo.save();
    res.status(200).json({ message: "Added to Todo", todo: { "title": body.title, "description": body.description } });
}

export const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as RequestParams;
    const deletedTodo = Todo.delete(params.id);
    res.status(200).json({ message: "Deleted todo", todo: deletedTodo });
}

export const updateTodo = (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params as RequestParams;
    const body = req.body as Todo;
    const updatedResponse = Todo.update(todoId.id, body.title, body.description);

    if (updatedResponse !== null) {
        return res.status(200).json({ message: "updated todo", todo: updatedResponse })
    }

    res.status(404).json({ message: "Could not find todo with id" });

}