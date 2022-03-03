import AppError from '@shared/errors/AppError';
import FakeCriticalItemsRepository from '../repositories/fakes/FakeCriticalItemsRepository';
import CreateCriticalItemsService from './CreateCriticalItemsService';

let fakeCriticalItemRepository: FakeCriticalItemsRepository;
let createCriticalItem: CreateCriticalItemsService;

jest.mock('axios', () => ({
  get: jest.fn((url, config) => {
    console.log(jest.fn);
    return {
      data: [
        {
          DESCRICAO: 'test description',
        },
      ],
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
    const response = await createCriticalItem.execute({
      part_number: 'VIXMOT0011',
      stock_obs: 'Teste',
      purchase_obs: 'Sem informação',
      used_obs: 'SP',
      responsable: 'Ronaldo',
    });

    expect(response);
  });

  it('There is no part number in our database', async () => {});
});
