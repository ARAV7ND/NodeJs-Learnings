import { Todo } from "../models/todos";
import { Request, Response, NextFunction } from "express";


type RequestParams = { id: string };

export const getTodoList = (req: Request, res: Response, next: NextFunction) => {

    Todo.fetchAll()
        .then(([rows]: any) => {
            res.status(200).json({ todo: rows })
        })
        .catch((err: any) => console.log(err));
}

export const addTodo = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as Todo;
    const todo = new Todo(body.title, body.description);
    todo.save()
        .then(() => {
            res.status(200)
                .json({ message: "Added to Todo", todo: { "title": body.title, "description": body.description } });
        })
        .catch((err: any) => {
            res.status(400).json({ message: `Error while inserting the data ${err}` })
        });
}

export const getById = (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as RequestParams;
    Todo.fetchById(params.id)
        .then(([rows]: any) => {
            res.status(200).json({ todo: rows });
        }).catch((err: any) => {
            res.status(400).json({ message: `there is no todo list with the ID : ${params.id}`, err: err.message })
        });
}

export const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as RequestParams;
    Todo.delete(params.id)
        .then(([rows]: any) => {
            if (rows.affectedRows > 0) {
                res.status(200).json({ message: "Todo deleted successfully" });
            } else {
                res.status(400).json({ message: `there is no todo list with the ID : ${params.id}` });
            }
        })
        .catch((err: any) => {
            res.status(400).json({ message: err.message })
        });
}

export const updateTodo = (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params as RequestParams;
    const body = req.body as Todo;

    Todo.update(todoId.id, body.title, body.description)
        .then(([row]: any) => {
            if (row.affectedRows > 0) {
                res.status(200).json({ message: "updated successfully" });
            } else {
                res.status(404).json({ message: "Could not find todo with id" });

            }
        })
        .catch((err: any) => {
            res.status(404).json({ message: err.message });
        });
}

