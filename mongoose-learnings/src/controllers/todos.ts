import { TodoList } from "../utils/types/types";
import { Request, Response, NextFunction } from "express";
import Todo from '../models/todos';

export const getTodoList = (req: any, res: Response, next: NextFunction) => {
    Todo.find()
        .then((todoList) => {
            res.status(200).json(todoList);
        })
        .catch((error: any) => res.status(400).json({ err: error.message }));

}

export const addTodo = (req: any, res: Response, next: NextFunction) => {
    console.log(req);
    const body = req.body;
    const todo = new Todo({
        title: body.title,
        description: body.description,
        status: body.status,
        userId: req.userData._id,
    });
    todo.save()
        .then((result) => {
            res.status(200).json({ message: "Todo added successfully" })
        })
        .catch((error: any) => res.status(400).json({ err: error.message }));

}

export const getById = (req: Request, res: Response, nxt: NextFunction) => {
    Todo.findById({ _id: req.params.id })
        .then((todoList) => {
            res.status(200).json(todoList);
        })
        .catch((error: any) => res.status(400).json({ err: error.message }));

};

export const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
    Todo
        .deleteOne({ _id: req.params.id })
        .then((result) => {
            if (result.deletedCount) {
                res.status(200).json({ message: "Todo deleted successfully" })

            }
        }).catch((error) => res.status(400).json({ message: error.message }));
}

export const updateTodo = (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params.id;
    const body = req.body as TodoList;
    Todo
        .findById(todoId)
        .then((todo) => {
            if (todo) {
                todo.title = body.title ?? todo?.title;
                todo.description = body.description ?? todo?.description;
                todo.status = body.status! ?? todo?.status;
                return todo.save();
            }
        }).then((result) => {
            res.status(200).json({ message: "Todo updated sucessfully", todo: result })
        })
        .catch((error) => {
            res.status(500).json({ message: `Todo not found: ${req.params.id}`, error: error });
        });
}