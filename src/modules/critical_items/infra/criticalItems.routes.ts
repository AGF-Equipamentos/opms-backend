import { Router } from 'express';
import CreateCriticalItemsController from './http/controllers/CreateCriticalItemsController';

const criticalItemsRouter = Router();

criticalItemsRouter.post('/', new CreateCriticalItemsController().post);

export default criticalItemsRouter;
