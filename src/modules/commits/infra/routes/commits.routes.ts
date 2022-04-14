import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import CommitsRouter from '@modules/commits/infra/http/controllers/CommitsController';

const commitsRouter = Router();
const commitsController = new CommitsRouter();

commitsRouter.use(ensureAuthenticated);

commitsRouter.get(
  '/:op_id',
  celebrate({
    [Segments.PARAMS]: {
      op_id: Joi.string().uuid().required(),
    },
  }),
  commitsController.index,
);

commitsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      commitsUpdated: Joi.array().items(
        Joi.object({
          commit_id: Joi.string().uuid().required(),
          qty_delivered: Joi.number(),
        }),
      ),
    },
  }),
  commitsController.update,
);

export default commitsRouter;
