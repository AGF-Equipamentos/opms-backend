import AppError from '@shared/errors/AppError';
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
  it('should be able to delete a critical item', async () => {
    const critical_item = await fakeCriticalItemsRepository.create({
      part_number: 'CHP0471',
      stock_obs: 'Teste 80',
      purchase_obs: 'Compra atorizada',
      used_obs: 'SP',
      responsable: 'Arthur',
      description: 'Vamos testar',
    });
    const critical_item02 = await fakeCriticalItemsRepository.create({
      part_number: 'CHP0472',
      stock_obs: 'Teste 90',
      purchase_obs: 'Compra não atorizada',
      used_obs: 'RJ',
      responsable: 'Ronaldo',
      description: 'teste',
    });
    const critical_item3 = await fakeCriticalItemsRepository.create({
      part_number: 'CHP0473',
      stock_obs: 'Teste 100',
      purchase_obs: 'Compra atorizada',
      used_obs: 'RJ',
      responsable: 'Arthur',
      description: 'Vamos testar',
    });
    await deleteCritical.execute({
      id: critical_item02.id,
    });

    const response = await fakeCriticalItemsRepository.findAll();

    expect(response).toStrictEqual([critical_item, critical_item3]);
  });

  it('should not be able to delete a non-existing critical item', async () => {
    await expect(
      deleteCritical.execute({
        id: 'non-existin-the-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
