// import { id } from 'date-fns/locale';
import FakeCriticalItemsRepository from '../repositories/fakes/FakeCriticalItemsRepository';
import UpdateStockService from './UpdateStockService';

let fakeCriticalItemsRepository: FakeCriticalItemsRepository;
let updateStock: UpdateStockService;

describe('UpdateStock', () => {
  beforeEach(() => {
    fakeCriticalItemsRepository = new FakeCriticalItemsRepository();
    updateStock = new UpdateStockService(fakeCriticalItemsRepository);
  });
  it('shoud be able to update the critical item', async () => {
    fakeCriticalItemsRepository.create({
      stock_obs: 'teste',
      used_obs: 'SP',
    });
    const response = await updateStock.execute({
      id,
      stock_obs: 'Teste_1',
      used_obs: 'ES',
    });
    expect(response).toMatchObject({ stock_obs: 'Teste_1' });
    expect(response).toMatchObject({ usd_obs: 'ES' });
  });
  it('should not be able to update a non-existing critical item', () => {});
});
