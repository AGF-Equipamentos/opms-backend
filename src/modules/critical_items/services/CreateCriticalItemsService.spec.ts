import AppError from '@shared/errors/AppError';
import FakeCriticalItemsRepository from '../repositories/fakes/FakeCriticalItemsRepository';
import CreateCriticalItemsService from './CreateCriticalItemsService';

let fakeCriticalItemRepository: FakeCriticalItemsRepository;
let createCriticalItem: CreateCriticalItemsService;

jest.mock('axios', () => ({
  get: jest.fn((_, config) => {
    if (config.params.produto === 'VIXMOT0011') {
      return { data: [{ DESCRICAO: 'DESCRIÇÃO TESTE' }] };
    }
    return { data: [] };
  }),
}));

describe('CreateCriticalItem', () => {
  beforeEach(() => {
    fakeCriticalItemRepository = new FakeCriticalItemsRepository();
    createCriticalItem = new CreateCriticalItemsService(
      fakeCriticalItemRepository,
    );
  });

  it('should be able to create a new critical item', async () => {
    const critical_item = await createCriticalItem.execute({
      part_number: 'VIXMOT0011',
      stock_obs: 'Teste',
      purchase_obs: 'Sem informação',
      used_obs: 'SP',
      responsable: 'Ronaldo',
    });

    expect(critical_item).toHaveProperty('id');
  });

  it('should not be able to create a critacal item if the part number does not exists', async () => {
    await expect(
      createCriticalItem.execute({
        part_number: 'xxxxxxx',
        stock_obs: 'Teste',
        purchase_obs: 'Sem informação',
        used_obs: 'SP',
        responsable: 'Ronaldo',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
