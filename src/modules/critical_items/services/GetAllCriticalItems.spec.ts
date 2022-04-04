import FakeCriticalItemsRepository from '../repositories/fakes/FakeCriticalItemsRepository';
import GetAllCriticalItemsService from './GetAllCriticalItemsService';

let fakeCriticalItemsRepository: FakeCriticalItemsRepository;
let getAll: GetAllCriticalItemsService;

describe('GetAllCriticalItem', () => {
  beforeEach(() => {
    fakeCriticalItemsRepository = new FakeCriticalItemsRepository();
    getAll = new GetAllCriticalItemsService(fakeCriticalItemsRepository);
  });

  it('should be able to show all critical items from three parameters', async () => {
    await fakeCriticalItemsRepository.create({
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
    await fakeCriticalItemsRepository.create({
      part_number: 'VIXMOT0013',
      stock_obs: 'Teste_007',
      purchase_obs: 'Sem informação',
      used_obs: 'MG',
      responsable: 'Alana',
      description: 'teste',
    });
    const response = await getAll.execute({
      part_number: 'VIXMOT0012',
      description: 'teste',
      responsable: 'Ronaldo',
    });
    expect(response).toStrictEqual([critical_item2]);
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
      responsable: 'Alana',
      description: 'teste',
    });
    const response = await getAll.execute({});
    expect(response).toStrictEqual([
      critical_item,
      critical_item2,
      critical_item3,
    ]);
  });
  it('should able to show all critical items filtered by the "part_number"', async () => {
    await fakeCriticalItemsRepository.create({
      part_number: 'FVPG02076',
      stock_obs: 'teste_007',
      purchase_obs: 'Sem Informação',
      used_obs: 'MG',
      responsable: 'Alana',
      description: 'teste_007',
    });
    await fakeCriticalItemsRepository.create({
      part_number: 'VIXABR0014',
      stock_obs: 'teste_008',
      purchase_obs: 'Sem Informação',
      used_obs: 'ES',
      responsable: 'Ronaldo',
      description: 'teste_008',
    });
    const critical_item3 = await fakeCriticalItemsRepository.create({
      part_number: 'FVPG05273',
      stock_obs: 'teste_009',
      purchase_obs: 'Sem Informação',
      used_obs: 'SP',
      responsable: 'Arthur',
      description: 'teste_009',
    });
    const response = await getAll.execute({
      part_number: 'FVPG05273',
    });
    expect(response).toStrictEqual([critical_item3]);
  });
  it('should be able to show all critical items filtered by the "description"', async () => {
    const critical_item = await fakeCriticalItemsRepository.create({
      part_number: 'VIXMOT0011',
      stock_obs: 'teste_007',
      purchase_obs: 'Sem Informação',
      used_obs: 'SP',
      responsable: 'James Bond',
      description: 'James Bond',
    });
    await fakeCriticalItemsRepository.create({
      part_number: 'G73181500',
      stock_obs: 'teste_006',
      purchase_obs: 'Sem Informação',
      used_obs: 'ES',
      responsable: 'Alana',
      description: 'Agente 006',
    });
    await fakeCriticalItemsRepository.create({
      part_number: 'MF75P20007',
      stock_obs: 'teste_005',
      purchase_obs: 'Sem Informação',
      used_obs: 'MG',
      responsable: 'Arthur',
      description: 'Agente 005',
    });
    const response = await getAll.execute({
      description: 'James Bond',
    });
    expect(response).toStrictEqual([critical_item]);
  });
  it('should be able to show all critical items filtered by the "responsable"', async () => {
    await fakeCriticalItemsRepository.create({
      part_number: 'VIXABR0014',
      stock_obs: 'teste_004',
      purchase_obs: 'Sem Informação',
      used_obs: 'ES',
      responsable: 'Ronaldo',
      description: 'Agente 004',
    });
    const critical_item2 = await fakeCriticalItemsRepository.create({
      part_number: '500000853',
      stock_obs: 'teste_003',
      purchase_obs: 'Sem Informação',
      used_obs: 'SP',
      responsable: 'Kevin',
      description: 'Agente 003',
    });
    await fakeCriticalItemsRepository.create({
      part_number: 'FVPG05273',
      stock_obs: 'Teste',
      purchase_obs: 'Sem Informação',
      used_obs: 'MG',
      responsable: 'Camila',
      description: 'Teste 1,2,1,2',
    });
    const response = await getAll.execute({
      responsable: 'Kevin',
    });
    expect(response).toStrictEqual([critical_item2]);
  });
});
