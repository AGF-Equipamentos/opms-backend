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
    const critical_item = await fakeCriticalItemsRepository.create({
      part_number: 'VIXMOT0011',
      stock_obs: 'Teste',
      purchase_obs: 'Sem informação',
      used_obs: 'SP',
      responsable: 'Ronaldo',
      description: 'teste',
    });
    const critical_item2 = await fakeCriticalItemsRepository.create({
      part_number: 'VIXMOT0012',
      stock_obs: 'Teste_04',
      purchase_obs: 'Compra atorizada',
      used_obs: 'RJ',
      responsable: 'Ronaldo',
      description: 'teste',
    });
    const critical_item3 = await fakeCriticalItemsRepository.create({
      part_number: 'VIXMOT0013',
      stock_obs: 'Teste_007',
      purchase_obs: 'Sem informação',
      used_obs: 'MG',
      responsable: 'Ronaldo',
      description: 'teste',
    });
    const response = await getAll.execute({
      part_number: 'VIXMOT',
    });

    expect(response).toStrictEqual([
      critical_item,
      critical_item2,
      critical_item3,
    ]);
  });
});
