import { inject, injectable } from 'tsyringe';
import CriticalItems from '../infra/typeorm/entities/CriticalItems';
import ICriticalItemsRepository from '../repositories/ICriticalItemsRepository';

@injectable()
export default class GetAllCriticalItemsService {
  constructor(
    @inject('CriticalItemsRepository')
    private criticalitmesRepository: ICriticalItemsRepository,
  ) {}

  public async execute(): Promise<CriticalItems[]> {
    const criticalitems = await this.criticalitmesRepository.findAll();

    return criticalitems;
  }
}
