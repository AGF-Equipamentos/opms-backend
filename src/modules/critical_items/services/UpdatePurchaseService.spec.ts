import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { textSpanContainsPosition } from 'typescript';
import FakeCriticalItemsRepository from '../repositories/fakes/FakeCriticalItemsRepository';
import UpdatePurchaseService from './UpdatePurchaseServise';

let fakeCriticalItemRepository: FakeCriticalItemsRepository;
let updatePurchase: UpdatePurchaseService;

describe('UpdatePurchase', () => {
  beforeEach(() => {
    fakeCriticalItemRepository = new FakeCriticalItemsRepository();
    updatePurchase = new UpdatePurchaseService(fakeCriticalItemRepository);
  });
  it('should be able to update the profile', async () => {
    const test = await fakeCriticalItemRepository.save({});
    console.log(test);
  });
});
