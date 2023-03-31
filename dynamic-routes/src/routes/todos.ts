import { Router } from "express";
import { addTodo, deleteTodo, getTodoList, updateTodo } from "../controllers/todos";

const router = Router();

router.get("/todo", getTodoList);

router.post("/todo", addTodo)

router.put("/todo/:id", updateTodo)

router.delete("/todo/:id", deleteTodo);

export default router;