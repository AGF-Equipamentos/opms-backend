import AppError from '@shared/errors/AppError';
import FakeCriticalItemsRepository from '../repositories/fakes/FakeCriticalItemsRepository';
import UpdatePurchaseService from './UpdatePurchaseServise';

let fakeCriticalItemsRepository: FakeCriticalItemsRepository;
let updatePurchase: UpdatePurchaseService;

describe('UpdatePurchase', () => {
  beforeEach(() => {
    fakeCriticalItemsRepository = new FakeCriticalItemsRepository();
    updatePurchase = new UpdatePurchaseService(fakeCriticalItemsRepository);
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

    const response = await updatePurchase.execute({
      id: critical_item.id,
      purchase_obs: 'Compra atorizada',
      responsable: 'Arthur',
    });

    expect(response.purchase_obs).toBe('Compra atorizada');
    expect(response.responsable).toBe('Arthur');
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
    const response = await updatePurchase.execute({
      id: critical_item.id,
      responsable: 'Ronaldo',
    });

    expect(response.purchase_obs).toBe('Sem informação');
  });

  it('should not be able to update a non-existing critical item', async () => {
    await expect(
      updatePurchase.execute({
        id: 'non-existing-the-id',
        purchase_obs: 'Compra atorizada',
        responsable: 'Ronaldo',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a critical item if the responsable does not be informed', async () => {
    const critical_item = await fakeCriticalItemsRepository.create({
      part_number: 'VIXMOT0011',
      stock_obs: 'Teste',
      purchase_obs: 'Sem informação',
      used_obs: 'SP',
      responsable: 'Ronaldo',
      description: 'teste',
    });
    await expect(
      updatePurchase.execute({
        id: critical_item.id,
        purchase_obs: 'compra atorizada',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
