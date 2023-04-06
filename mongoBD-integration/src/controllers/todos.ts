import Todo from "../models/todos";
import { TodoList } from "../utils/types/types";
import { Request, Response, NextFunction } from "express";
import { ObjectId } from 'mongodb';

export const getTodoList = (req: any, res: Response, next: NextFunction) => {
    Todo
        .fetchAll()
        .then((todoList) => {
            res.status(200).json(todoList);
        })
        .catch((error: any) => res.status(400).json({ err: error.message }));

}

export const getById = (req: any, res: Response, next: NextFunction) => {
    Todo
        .findById(req.params.id)
        .then((todo) => {
            res.status(200).json(todo);
        })
        .catch((error: any) => res.status(400).json({ err: error.message }));
}

export const addTodo = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as TodoList;
    const todo = new Todo(body.title, body.description, body.status);
    todo.save()
        .then((result) => {
            res.status(200).json({ message: "Todo added successfully", todo: result })
        })
        .catch((error: any) => res.status(400).json({ err: error.message }));

}


export const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params.id as unknown as ObjectId;
    Todo.deleteById(todoId).then((result) => {
        if (result.deletedCount) {
            res.status(200).json({ message: "Todo deleted successfully" })

        }
    }).catch((error) => res.status(400).json({ message: error.message }));
}

export const updateTodo = (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params.id as unknown as ObjectId;
    const body = req.body as TodoList;
    Todo
        .findById(todoId)
        .then((todo) => {
            const updateValues: TodoList = {
                title: body.title ?? todo?.title,
                description: body.description ?? todo?.description,
                status: body.status ?? todo?.status
            }
            return new Todo(updateValues.title, updateValues.description, updateValues.status, todoId);

        }).then((result) => {
            result.save();
            res.status(200).json({ message: result })
        })
        .catch((error) => {
            res.status(404).json({ message: `Todo not found: ${req.params.id}`, error: error });
        });
}