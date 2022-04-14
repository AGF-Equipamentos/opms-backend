import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { CriticalItems } from '../infra/typeorm/entities/CriticalItems';
import ICriticalItemsRepository from '../repositories/ICriticalItemsRepository';

type CriticalItemsRequest = {
  id: string;
  purchase_obs?: string;
  description?: string;
  responsable?: string;
};

@injectable()
export default class UpdatedPurchaseServise {
  constructor(
    @inject('CriticalItemsRepository')
    private criticalItemsRepository: ICriticalItemsRepository,
  ) {}

  public async execute({
    id,
    purchase_obs,
    description,
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
    criticalitems.description = description || criticalitems.description;
    criticalitems.responsable = responsable;

    const updatedCriticalItems = await this.criticalItemsRepository.save(
      criticalitems,
    );

    return updatedCriticalItems;
  }
}
