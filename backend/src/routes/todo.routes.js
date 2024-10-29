import { Router } from 'express';
import {
  createTodo,
  getTodos,
  getTag,
  getTags,
  updateTodo,
  getFilteredTodos,
  deleteTodo,
} from '../controllers/todo.route.js';

const todoRoute = Router();

todoRoute.post('/new', createTodo);
todoRoute.get('', getTodos);
todoRoute.get('/tags', getTags);
todoRoute.get('/tag/:id', getTag);
todoRoute.put('/edit/:id', updateTodo);
todoRoute.get('/filter/:query', getFilteredTodos);
todoRoute.delete('/delete/:id', deleteTodo);

export default todoRoute;
