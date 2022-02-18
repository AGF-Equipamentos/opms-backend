// import { string } from '@hapi/joi';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { CriticalItems } from '../infra/typeorm/entities/CriticalItems';
import ICriticalItemsRepository from '../repositories/ICriticalItemsRepository';

type CriticalItemsRequest = {
  id: string;
  part_number: string;
  stock_obs: string;
  purchase_obs: string;
  used_obs: string;
  responsable: string;
};

@injectable()
export default class UpdateCriticalItemsService {
  constructor(
    @inject('CriticalItemsRepository')
    private criticalItemsRepository: ICriticalItemsRepository,
  ) {}

  public async execute({
    id,
    part_number,
    stock_obs,
    purchase_obs,
    used_obs,
    responsable,
  }: CriticalItemsRequest): Promise<CriticalItems> {
    const criticalitems = await this.criticalItemsRepository.findById(id);

    if (!criticalitems) {
      throw new AppError('Item does not exists!');
    }
    criticalitems.part_number = part_number || criticalitems.part_number; // Add esse item
    criticalitems.stock_obs = stock_obs || criticalitems.stock_obs;
    criticalitems.purchase_obs = purchase_obs || criticalitems.purchase_obs;
    criticalitems.used_obs = used_obs || criticalitems.used_obs;
    criticalitems.responsable = responsable || criticalitems.responsable;

    const updateCriticalItems = await this.criticalItemsRepository.save(
      criticalitems,
    );

    return updateCriticalItems;
  }
}
