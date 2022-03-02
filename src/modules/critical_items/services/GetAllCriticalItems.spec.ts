import FakeCriticalItemsRepository from '../repositories/fakes/FakeCriticalItemsRepository';
import GetAllCriticalItemsService from './GetAllCriticalItemsService';

let fakeCriticalItemsRepository: FakeCriticalItemsRepository;
let getAll: GetAllCriticalItemsService;

describe('GetAllCriticalItem', () => {
  beforeEach(() => {
    fakeCriticalItemsRepository = new FakeCriticalItemsRepository();
    getAll = new GetAllCriticalItemsService(fakeCriticalItemsRepository);
  });

  it('should be able to show all the critical items', async () => {
    const crical_item = await fakeCriticalItemsRepository.create({
      part_number: 'VIXMOT0011',
      stock_obs: 'Teste',
      purchase_obs: 'Sem informação',
      used_obs: 'SP',
      responsable: 'Ronaldo',
      description: 'teste',
    });
    expect(crical_item);

    // const critical_item2 = await fakeCriticalItemsRepository.create({
    // part_number
    // })
    // criar mais de um critical item
    // quando a chamar o serviço ele tem que retornar todos
  });
});
