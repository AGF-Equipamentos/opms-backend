import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import CriticalItemsController from '../http/controllers/CriticalItemsController';

const criticalItemsRouter = Router();
const criticalItemsController = new CriticalItemsController();

criticalItemsRouter.get('/', criticalItemsController.index);

criticalItemsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      part_number: Joi.string().required(),
      stock_obs: Joi.string(),
      purchase_obs: Joi.string(),
      used_obs: Joi.string(),
      responsable: Joi.string(),
    },
  }),
  criticalItemsController.create,
);

criticalItemsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      stock_obs: Joi.string(),
      purchase_obs: Joi.string(),
      used_obs: Joi.string(),
      responsable: Joi.string(),
    },
  }),
  criticalItemsController.update,
);

criticalItemsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  criticalItemsController.delete,
);

export default criticalItemsRouter;
