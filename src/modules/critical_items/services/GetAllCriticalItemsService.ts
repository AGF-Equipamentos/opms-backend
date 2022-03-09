import { inject, injectable } from 'tsyringe';
import CriticalItems from '../infra/typeorm/entities/CriticalItems';
import ICriticalItemsRepository from '../repositories/ICriticalItemsRepository';

@injectable()
export default class GetAllCriticalItemsService {
  constructor(
    @inject('CriticalItemsRepository')
    private criticalitmesRepository: ICriticalItemsRepository,
  ) {}

  public async execute(part_number): Promise<CriticalItems[] | undefined> {
    const criticalitems = await this.criticalitmesRepository.findAll(
      part_number,
    );

    return criticalitems;
  }
}
