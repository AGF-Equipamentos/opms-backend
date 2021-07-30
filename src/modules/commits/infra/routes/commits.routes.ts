import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import CommitsRouter from '@modules/commits/infra/http/controllers/CommitsController';

const commitsRouter = Router();
const commitsController = new CommitsRouter();

commitsRouter.use(ensureAuthenticated);

commitsRouter.put(
  '/:commit_id',
  celebrate({
    [Segments.PARAMS]: {
      commit_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      qty_delivered: Joi.number(),
    },
  }),
  commitsController.update,
);

export default commitsRouter;
