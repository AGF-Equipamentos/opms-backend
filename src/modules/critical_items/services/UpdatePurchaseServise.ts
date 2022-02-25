import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { CriticalItems } from '../infra/typeorm/entities/CriticalItems';
import ICriticalItemsRepository from '../repositories/ICriticalItemsRepository';

type CriticalItemsRequest = {
  id: string;
  purchase_obs: string;
  responsable: string;
};

@injectable()
export default class UpdatePurchaseService {
  constructor(
    @inject('CriticalItemsRepository')
    private criticalItemsRepository: ICriticalItemsRepository,
  ) {}

  public async execute({
    id,
    purchase_obs,
    responsable,
  }: CriticalItemsRequest): Promise<CriticalItems> {
    const criticalitems = await this.criticalItemsRepository.findById(id);

    if (!criticalitems) {
      throw new AppError('Critical item does not exists!');
    }

    if (!responsable) {
      throw new AppError('Responsable not informed');
    }

    criticalitems.purchase_obs = purchase_obs || criticalitems.purchase_obs;
    criticalitems.responsable = responsable || criticalitems.responsable;

    const updateCriticalItems = await this.criticalItemsRepository.save(
      criticalitems,
    );

    return updateCriticalItems;
  }
}
