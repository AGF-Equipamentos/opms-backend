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
  fakeCriticalItemsRepository.create({
    purchase: 'Sem informação',
    responsable: 'Ronaldo',
  });
    const response = await updatePurchase.execute({
     id,
     purchase_obs: 'Compra atorizada',
     responsable: 'Arthur',
   });
   expect(response).toMatchObject({ purchase: 'teste'});
   expect(response).toMatchObject({ responsable: 'SP'});

  it('should not be able to update a non-existing critical item', () => {});

  it('should not be able to update a critical item if the responsable does not be informed', () => {});
});