import FakeCriticalItemsRepository from '../repositories/fakes/FakeCriticalItemsRepository';
import CreateCriticalItemsService from './CreateCriticalItemsService';

let fakeCriticalItemRepository: FakeCriticalItemsRepository;
let createCriticalItem: CreateCriticalItemsService;

describe('CreateCriticalItem', () => {
  beforeEach(() => {
    fakeCriticalItemRepository = new FakeCriticalItemsRepository();
    createCriticalItem = new CreateCriticalItemsService(
      fakeCriticalItemRepository,
    );
  });
  it('should be able to create a new critical item', async () => {
    const test = await fakeCriticalItemRepository.create({
      part_number: 'VIXMOT0011',
      stock_obs: 'Teste',
      purchase_obs: 'Sem informação',
      used_obs: 'SP',
      responsable: 'Ronaldo',
      description: 'teste',
    });
    console.log(test);
  });

  it('should not be able to create a critacal item if the part number does not exists', () => {});
});
