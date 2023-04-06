import { NextFunction, Request, Response } from "express";
import User from '../models/users';
import { ObjectId } from 'mongodb';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
    User.getAll()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(err))

}

export const getById = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id as unknown as ObjectId;
    User.getById(userId)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error: any) => res.status(400).json({ err: error.message }));
}

export const addUser = (req: Request, res: Response, next: NextFunction) => {
    const user = new User(req.body.name, req.body.email);
    user.save()
        .then((user) => res.status(200).json(user))
        .catch(err => res.status(400).json(err));
}

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    User
        .deleteUser(req.params.id as unknown as ObjectId)
        .then((user) => res.status(200).json({ message: "User deleted successfully" }))
        .catch(err => res.status(400).json(err));
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id as unknown as ObjectId;
    User.getById(userId)
        .then((user) => {
            const newUser = {
                name: req.body.name ?? user?.name,
                email: req.body.email ?? user?.email,
            }
            return new User(newUser.name, newUser.email, userId)
        })
        .then((result) => {
            result.save();
            res.status(200).json({ message: "updated successfully" })
        })
        .catch(err => {
            res.status(404).json({ message: `User not found: ${req.params.id}`, error: err });
        });

};