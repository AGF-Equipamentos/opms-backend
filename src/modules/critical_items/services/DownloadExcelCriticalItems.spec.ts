import FakeCriticalItemsRepository from '../repositories/fakes/FakeCriticalItemsRepository';
import DownloadExcelCriticalItemsService from './DownloadExcelCriticalItemsService';

let fakeCriticalItemRepository: FakeCriticalItemsRepository;
let downloadExcelCriticalItems: DownloadExcelCriticalItemsService;

describe('downloadExcelCriticalItems', () => {
  beforeEach(() => {
    fakeCriticalItemRepository = new FakeCriticalItemsRepository();
    downloadExcelCriticalItems = new DownloadExcelCriticalItemsService(
      fakeCriticalItemRepository,
    );
  });
  it('should able to lower a spreadsheet', async () => {
    await fakeCriticalItemRepository.create({
      part_number: 'FVPG02076',
      stock_obs: 'Teste',
      purchase_obs: 'Compra autorizada',
      used_obs: 'SP',
      responsable: 'Ronaldo',
      description: 'Olá',
    });
    await fakeCriticalItemRepository.create({
      part_number: 'SBM3060F212',
      stock_obs: 'teste',
      purchase_obs: 'Compra não autorizada',
      used_obs: 'SP',
      responsable: 'Katriel',
      description: 'Espero que de certo',
    });
    const critical_items1 = await fakeCriticalItemRepository.create({
      part_number: 'VIXABR0014',
      stock_obs: 'teste',
      purchase_obs: 'Compra autorizada',
      used_obs: 'SP',
      responsable: 'Arthur',
      description: 'Deu certooo!!!!!',
    });
    const response = await downloadExcelCriticalItems.execute({
      part_number: 'VIXABR0014',
    });
    expect(response).toStrictEqual([critical_items1]);
    // expect(critical_items1.part_number).toBe('VIXABR0014');
  });
  it('should able to lower a spreadsheet', async () => {
    const critical_item2 = await fakeCriticalItemRepository.create({
      part_number: 'FVPG02076',
      stock_obs: 'Teste',
      purchase_obs: 'Compra autorizada',
      used_obs: 'SP',
      responsable: 'Ronaldo',
      description: 'Olá',
    });
    await fakeCriticalItemRepository.create({
      part_number: 'SBM3060F212',
      stock_obs: 'teste',
      purchase_obs: 'Compra não autorizada',
      used_obs: 'SP',
      responsable: 'Katriel',
      description: 'Espero que de certo',
    });
    await fakeCriticalItemRepository.create({
      part_number: 'VIXABR0014',
      stock_obs: 'teste',
      purchase_obs: 'Compra autorizada',
      used_obs: 'SP',
      responsable: 'Arthur',
      description: 'Deu certooo!!!!!',
    });
    const response = await downloadExcelCriticalItems.execute({
      description: 'Olá',
    });
    expect(response).toStrictEqual([critical_item2]);
  });
  it('should able to lower a spreadsheet', async () => {
    await fakeCriticalItemRepository.create({
      part_number: 'FVPG02076',
      stock_obs: 'Teste',
      purchase_obs: 'Compra autorizada',
      used_obs: 'SP',
      responsable: 'Ronaldo',
      description: 'Olá',
    });
    const critical_item3 = await fakeCriticalItemRepository.create({
      part_number: 'SBM3060F212',
      stock_obs: 'teste',
      purchase_obs: 'Compra não autorizada',
      used_obs: 'SP',
      responsable: 'Katriel',
      description: 'Espero que de certo',
    });
    await fakeCriticalItemRepository.create({
      part_number: 'VIXABR0014',
      stock_obs: 'teste',
      purchase_obs: 'Compra autorizada',
      used_obs: 'SP',
      responsable: 'Arthur',
      description: 'Deu certooo!!!!!',
    });
    const response = await downloadExcelCriticalItems.execute({
      responsable: 'Katriel',
    });
    expect(response).toStrictEqual([critical_item3]);
  });
});
