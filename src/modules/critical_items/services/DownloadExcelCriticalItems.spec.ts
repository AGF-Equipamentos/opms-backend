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
  it('should able to lower a spreadsheet "part_number"', async () => {
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
      stock_obs: 'Teste',
      purchase_obs: 'Compra não autorizada',
      used_obs: 'SP',
      responsable: 'Katriel',
      description: 'Espero que de certo',
    });
    await fakeCriticalItemRepository.create({
      part_number: 'VIXABR0014',
      stock_obs: 'Teste',
      purchase_obs: 'Compra autorizada',
      used_obs: 'SP',
      responsable: 'Arthur',
      description: 'Deu certooo!!!!!',
    });

    const workbook = await downloadExcelCriticalItems.execute({
      part_number: 'VIXABR0014',
    });

    // @ts-expect-error: removing dates generates to dont break the test
    delete workbook.created;
    // @ts-expect-error: removing dates generates to dont break the test
    delete workbook.modified;

    expect(workbook).toMatchSnapshot();
  });
  it('should able to lower a spreadsheet "description"', async () => {
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
      stock_obs: 'Teste',
      purchase_obs: 'Compra não autorizada',
      used_obs: 'SP',
      responsable: 'Katriel',
      description: 'Espero que de certo',
    });
    await fakeCriticalItemRepository.create({
      part_number: 'VIXABR0014',
      stock_obs: 'Teste',
      purchase_obs: 'Compra autorizada',
      used_obs: 'SP',
      responsable: 'Arthur',
      description: 'Deu certooo!!!!!',
    });

    const workbook = await downloadExcelCriticalItems.execute({
      description: 'Olá',
    });

    // @ts-expect-error: removing dates generates to dont break the test
    delete workbook.created;
    // @ts-expect-error: removing dates generates to dont break the test
    delete workbook.modified;

    expect(workbook).toMatchSnapshot();
  });
  it('should able to lower a spreadsheet "responsable"', async () => {
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
      stock_obs: 'Teste',
      purchase_obs: 'Compra não autorizada',
      used_obs: 'SP',
      responsable: 'Katriel',
      description: 'Espero que de certo',
    });
    await fakeCriticalItemRepository.create({
      part_number: 'VIXABR0014',
      stock_obs: 'Teste',
      purchase_obs: 'Compra autorizada',
      used_obs: 'SP',
      responsable: 'Arthur',
      description: 'Deu certooo!!!!!',
    });

    const workbook = await downloadExcelCriticalItems.execute({
      responsable: 'Katriel',
    });

    // @ts-expect-error: removing dates generates to dont break the test
    delete workbook.created;
    // @ts-expect-error: removing dates generates to dont break the test
    delete workbook.modified;

    expect(workbook).toMatchSnapshot();
  });
});
