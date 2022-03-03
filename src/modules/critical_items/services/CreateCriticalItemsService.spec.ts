// import AppError from '@shared/errors/AppError';
import FakeCriticalItemsRepository from '../repositories/fakes/FakeCriticalItemsRepository';
import CreateCriticalItemsService from './CreateCriticalItemsService';

let fakeCriticalItemRepository: FakeCriticalItemsRepository;
let createCriticalItem: CreateCriticalItemsService;

jest.mock('axios', () => ({
  get: jest.fn(() => {
    const register = {
      CODIGO: 'VIXMOT0011V',
      DESCRICAO: 'MOTOR ELETRICO TRIFASICO',
      LOCACAO: 'A1',
      GRUPO: '3034',
      PP: '0',
      LE: '0',
      UM: 'UN',
      ESTSEG: '2',
      APROPRI: 'I',
      BLOQUEADO: 'FALSO',
    };
    return register;
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
    await createCriticalItem.execute({
      part_number: 'VIXMOT0011',
      stock_obs: 'Teste',
      purchase_obs: 'Sem informação',
      used_obs: 'SP',
      responsable: 'Ronaldo',
    });
  });

  it('There is no part number in our database', async () => {});
});
