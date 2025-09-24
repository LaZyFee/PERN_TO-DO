import express from 'express';
import cors from 'cors';
import dotendv from 'dotenv';
import todoRoutes from './Routes/todos.js';


dotendv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

});

export default app;