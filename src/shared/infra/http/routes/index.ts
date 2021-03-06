import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import opsRouter from '@modules/ops/infra/http/routes/ops.routes';
import commitsRouter from '@modules/commits/infra/routes/commits.routes';
import criticalItemsRouter from '@modules/critical_items/infra/routes/criticalItems.routes';

const routes = Router();

// users
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/profile', profileRouter);
routes.use('/ops', opsRouter);
routes.use('/commits', commitsRouter);
routes.use('/critical-items', criticalItemsRouter);

export default routes;
