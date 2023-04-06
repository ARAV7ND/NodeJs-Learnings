import { Router } from "express";
import { addTodo, deleteTodo, getById, getTodoList, updateTodo } from "../controllers/todos";

const router = Router();

router.get("/todo", getTodoList);
router.get("/todo/:id", getById);
router.post("/todo", addTodo)
router.put("/todo/:id", updateTodo)
router.delete("/todo/:id", deleteTodo);

export default router;