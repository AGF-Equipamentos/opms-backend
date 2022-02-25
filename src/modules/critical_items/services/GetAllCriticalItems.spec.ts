import FakeCriticalItemsRepository from '../repositories/fakes/FakeCriticalItemsRepository';
import GetAllCriticalItemsService from './GetAllCriticalItemsService';

let fakeCriticalItemsRepository: FakeCriticalItemsRepository;
let getAll: GetAllCriticalItemsService;

describe('GetAllCriticalItem', () => {
  beforeEach(() => {
    fakeCriticalItemsRepository = new FakeCriticalItemsRepository();
    getAll = new GetAllCriticalItemsService(fakeCriticalItemsRepository);
  });

  it('should be able to show all the critical items', () => {
    // criar mais de um critical item
    // quando a chamar o serviço ele tem que retornar todos
  });
});
