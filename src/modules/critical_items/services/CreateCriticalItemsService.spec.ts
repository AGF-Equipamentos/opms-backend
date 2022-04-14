import AppError from '@shared/errors/AppError';
import FakeCriticalItemsRepository from '../repositories/fakes/FakeCriticalItemsRepository';
import CreateCriticalItemsService from './CreateCriticalItemsService';

let fakeCriticalItemRepository: FakeCriticalItemsRepository;
let createCriticalItem: CreateCriticalItemsService;

jest.mock('axios', () => ({
  get: jest.fn((_, config) => {
    if (config.params.produto === 'VIXMOT0011') {
      return {
        data: [
          {
            DESCRICAO: 'test description',
          },
        ],
      };
    }

    return {
      data: [],
    };
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
    expect(critical_item.description).toBe('test description');
  });

  it('There is no part number in our database', async () => {
    await expect(
      createCriticalItem.execute({
        part_number: 'VIXMOT0012',
        stock_obs: 'Teste',
        purchase_obs: 'Sem informação',
        used_obs: 'SP',
        responsable: 'Ronaldo',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
