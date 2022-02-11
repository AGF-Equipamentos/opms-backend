import { inject, injectable } from 'tsyringe';
import { CriticalItems } from '../infra/typeorm/entities/CriticalItems';
import ICriticalItemsRepository from '../repositories/ICriticalItemsRepository';

type CriticalItemsRequest = {
  part_number: string;
  description: string;
  stock_obs: string;
  purchase_obs: string;
  used_obs: string;
  responsable: string;
};

@injectable()
export default class CreateCriticalItemsService {
  constructor(
    @inject('CriticalItemsRepository')
    private criticalItemsRepository: ICriticalItemsRepository,
  ) {}

  async execute({
    part_number,
    description,
    stock_obs,
    purchase_obs,
    used_obs,
    responsable,
  }: CriticalItemsRequest): Promise<CriticalItems> {
    console.log('service');
    console.log(this.criticalItemsRepository);
    const criticalitems = await this.criticalItemsRepository.create({
      part_number,
      description,
      stock_obs,
      purchase_obs,
      used_obs,
      responsable,
    });

    return criticalitems;
  }
}
