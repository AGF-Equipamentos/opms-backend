import FakeCriticalItemsRepository from '../repositories/fakes/FakeCriticalItemsRepository';
import DeleteCriticalItemsService from './DeleteCriticalItemsService';

let fakeCriticalItemsRepository: FakeCriticalItemsRepository;
let deleteCritical: DeleteCriticalItemsService;

describe('DeleteCriticalItem', () => {
  beforeEach(() => {
    fakeCriticalItemsRepository = new FakeCriticalItemsRepository();
    deleteCritical = new DeleteCriticalItemsService(
      fakeCriticalItemsRepository,
    );
  });
  it('should be able to delete a critical item', async () => {});

  it('should not be able to delete a non-existing critical item', () => {});
});
