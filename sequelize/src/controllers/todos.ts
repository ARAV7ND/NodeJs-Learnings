import Todo from "../models/todos";
import { TodoList, RequestParams } from "../utils/types/types";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from 'uuid';

export const getTodoList = (req: any, res: Response, next: NextFunction) => {
    req.user.getTodos()
        .then((todoList: TodoList) => {
            res.status(200).json(todoList);
        })
        .catch((error: any) => res.status(400).json({ err: error.message }));

}

export const addTodo = (req: any, res: Response, next: NextFunction) => {
    const body = req.body as TodoList;

    req.user.createTodo({
        id: uuidv4(),
        title: body.title,
        description: body.description,
        userId: req.user.id,
    }).then((result: any) => {
        res.status(200).json({ message: "Todo added successfully" })
    })
        .catch((error: any) => {
            res.status(400).json({ err: error.message })
        })

}

export const getById = (req: any, res: Response, next: NextFunction) => {
    const params = req.params as RequestParams;
    req.user.getTodos({ where: { id: params.id } })
        .then((todo: TodoList) => {
            res.status(200).json(todo);
        }).catch((error: any) => {
            res.status(400).json({ err: error.message })
        });
}

export const deleteTodo = (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as RequestParams;

    Todo.findByPk(params.id).then((todo) => {
        if (todo) {
            todo.destroy();
            return res.status(200).json({ message: "Todo deleted successfully" });

        }
        res.status(400).json({ message: `there is no todo list with the ID : ${params.id}` });
    }).catch((err) => {
        res.status(400).json({ message: err.message })
    });

}

export const updateTodo = (req: Request, res: Response, next: NextFunction) => {
    const todoId = req.params as RequestParams;
    const body = req.body as TodoList;

    Todo.findByPk(todoId.id)
        .then((todo: any) => {
            if (todo) {
                todo.title = body.title ?? todo.title;
                todo.description = body.description ?? todo.description;
                todo.completed = body.completed ?? todo.completed;
                todo.save();
                return res.status(200).json({ message: "updated successfully" });
            }
            res.status(404).json({ message: "Could not find todo with id" });
        })
        .catch(err => {
            res.status(404).json({ message: err.message });

        })
}