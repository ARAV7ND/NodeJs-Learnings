import { Request } from "express";
import { ObjectId } from 'mongodb';

export interface UserType {
    id: number;
    name: string;
    email: string;
}

export interface TodoList {
    _id?: ObjectId;
    title: string;
    description: string;
    status: string;
}

export type TextOrNull = string | null;

export type RequestParams = { id: ObjectId };

export interface CustomRequest extends Request {
    user: UserType;
}