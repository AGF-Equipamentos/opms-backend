import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { CriticalItems } from '../infra/typeorm/entities/CriticalItems';
import ICriticalItemsRepository from '../repositories/ICriticalItemsRepository';

type CriticalItemsRequest = {
  id: string;
  stock_obs: string;
  used_obs: string;
};

@injectable()
export default class UpdateStockService {
  constructor(
    @inject('CriticalItemsRepository')
    private criticalItemsRepository: ICriticalItemsRepository,
  ) {}

  public async execute({
    id,
    stock_obs,
    used_obs,
  }: CriticalItemsRequest): Promise<CriticalItems> {
    const criticalitems = await this.criticalItemsRepository.findById(id);

    if (!criticalitems) {
      throw new AppError('Item does not exists!');
    }

    criticalitems.stock_obs = stock_obs || criticalitems.stock_obs;
    criticalitems.used_obs = used_obs || criticalitems.used_obs;

    const updateCriticalItems = await this.criticalItemsRepository.save(
      criticalitems,
    );

    return updateCriticalItems;
  }
}
