import express from "express";
import { getTodosByUser, createTodo, updateTodo, updateTodoStatus, deleteTodo, getAllTodos } from "../controllers/todoController.js";


const router = express.Router();
router.get("/", getAllTodos);
router.get("/:user_id", getTodosByUser);
router.post("/create-todo", createTodo);
router.put("/update-todo/:id", updateTodo);
router.put("/update-todo-status/:id", updateTodoStatus);
router.delete("/delete-todo/:id", deleteTodo);




export default router;