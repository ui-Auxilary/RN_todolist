import { Router } from 'express';
import todoRoute from './todo.routes.js';

const rootRoute = Router();

rootRoute.use('/todos', todoRoute);

export default rootRoute;
