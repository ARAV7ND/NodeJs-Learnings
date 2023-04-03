import { Request } from "express";

export interface UserType {
    id: number;
    name: string;
    email: string;
}

export interface TodoList {
    id: string;
    title: string;
    description: string;
    completed?: boolean;
    userId?: number | null;
}

export type TextOrNull = string | null;

export type RequestParams = { id: string };

export interface CustomRequest extends Request {
    user: UserType;
}