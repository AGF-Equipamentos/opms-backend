import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import OPsController from '../controllers/OPsController';

const opsRouter = Router();
const opsController = new OPsController();

opsRouter.use(ensureAuthenticated);

opsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      department: Joi.string(),
    },
  }),
  opsController.index,
);

opsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      status: Joi.string().required(),
      op_number: Joi.string().required(),
    },
  }),
  opsController.create,
);

opsRouter.put(
  '/:op_id',
  celebrate({
    [Segments.PARAMS]: {
      op_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      status: Joi.string(),
      op_number: Joi.string(),
    },
  }),
  opsController.update,
);

opsRouter.delete(
  '/:op_id',
  celebrate({
    [Segments.PARAMS]: {
      op_id: Joi.string().uuid().required(),
    },
  }),
  opsController.delete,
);

export default opsRouter;
