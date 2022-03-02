import AppError from '@shared/errors/AppError';
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
    const critical_item = await fakeCriticalItemsRepository.create({
      part_number: 'VIXMOT0011',
      stock_obs: 'Teste',
      purchase_obs: 'Sem informação',
      used_obs: 'SP',
      responsable: 'Ronaldo',
      description: 'teste',
    });

    const response = await updateStock.execute({
      id: critical_item.id,
      stock_obs: 'Teste_1',
      used_obs: 'ES',
    });

    expect(response.stock_obs).toBe('Teste_1');
    expect(response.used_obs).toBe('ES');
  });

  it('shoud be able to does not modified if one or more properties not be informed', async () => {
    const critical_item = await fakeCriticalItemsRepository.create({
      part_number: 'VIXMOT0011',
      stock_obs: 'Teste',
      purchase_obs: 'Sem informação',
      used_obs: 'SP',
      responsable: 'Ronaldo',
      description: 'teste',
    });

    const response = await updateStock.execute({
      id: critical_item.id,
    });

    expect(response.stock_obs).toBe('Teste');
    expect(response.used_obs).toBe('SP');
  });

  it('should not be able to update a non-existing critical item', async () => {
    await expect(
      updateStock.execute({
        id: 'non-existing-the-id',
        stock_obs: 'Teste_1',
        used_obs: 'ES',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
