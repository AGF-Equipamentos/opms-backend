import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import CriticalItemsController from '../http/controllers/CriticalItemsController';

const criticalItemsRouter = Router();
const criticalItemsController = new CriticalItemsController();

// adicionar celebrate query params
// fazer o dowloand igual ao get
criticalItemsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      part_number: Joi.string(),
      description: Joi.string(),
      responsable: Joi.string(),
    },
  }),
  criticalItemsController.index,
);

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
  '/stock/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      stock_obs: Joi.string(),
      description: Joi.string(),
      used_obs: Joi.string(),
    },
  }),
  criticalItemsController.update,
);

criticalItemsRouter.put(
  '/purchase/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      purchase_obs: Joi.string(),
      description: Joi.string(),
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
