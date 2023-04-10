import { NextFunction, Request, Response } from "express";
import User from '../models/users';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err))

}

export const addUser = (req: Request, res: Response, next: NextFunction) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email
    });
    user.save()
        .then((user) => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
}

export const getById = (req: Request, res: Response, next: NextFunction) => {
    User.findById(req.params.id)
        .then((user) => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
}

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
    User.findById(req.params.id)
        .then((user) => {
            if (user) {
                user.name = req.body.name ?? user.name;
                user.email = req.body.email ?? user.email;
                return user.save();
            }
        })
        .then((user) => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    User.deleteOne({ _id: req.params.id })
        .then((user) => res.status(200).json(user))
        .catch(err => res.status(err));
};