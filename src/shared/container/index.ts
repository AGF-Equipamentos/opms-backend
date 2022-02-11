import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IOPsRepository from '@modules/ops/repositories/IOPsRepository';
import OPsRepository from '@modules/ops/infra/typeorm/repositories/OPsRepository';

import CommitsRepository from '@modules/commits/infra/typeorm/repositories/CommitsRepository';
import ICommitsRepository from '@modules/commits/repositories/ICommitsRepository';

import CriticalItemsRepository from '@modules/critical_items/infra/typeorm/repositories/CriticalItemsRepository';
import ICriticalItemsRepository from '@modules/critical_items/repositories/ICriticalItemsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<IOPsRepository>('OPsRepository', OPsRepository);

container.registerSingleton<ICommitsRepository>(
  'CommitsRepository',
  CommitsRepository,
);

container.registerSingleton<ICriticalItemsRepository>(
  'CriticalItemsRepository',
  CriticalItemsRepository,
);
