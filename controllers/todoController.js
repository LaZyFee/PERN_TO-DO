import pool from "../config/db.js";


// Create a new todo
export const createTodo = async (req, res) => {
    try {
        const { description, name } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (name,description) VALUES ($1, $2) RETURNING *",
            [name, description]
        );
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};
// Update the completed status of a todo
export const updateTodoStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { completed } = req.body;

        // Ensure completed is a boolean
        if (typeof completed !== 'boolean') {
            return res.status(400).json({ error: "'completed' must be a boolean value" });
        }

        const updatedTodo = await pool.query(
            "UPDATE todo SET completed = $1 WHERE todo_id = $2 RETURNING *",
            [completed, id]
        );

        if (updatedTodo.rows.length === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json(updatedTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};


// Get all todos for a specific user
export const getTodosByUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const todos = await pool.query("SELECT * FROM todos WHERE user_id = $1", [
            user_id,
        ]);
        res.json(todos.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// Update a todo
export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updatedTodo = await pool.query(
            "UPDATE todos SET description = $1 WHERE id = $2 RETURNING *",
            [description, id]
        );
        res.json(updatedTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await pool.query("DELETE FROM todos WHERE id = $1", [
            id,
        ]);
        res.json(deletedTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// Get all todos (for admin purposes)
export const getAllTodos = async (req, res) => {
    try {
        const todos = await pool.query("SELECT * FROM todos");
        res.json(todos.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};