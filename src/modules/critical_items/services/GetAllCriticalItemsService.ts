import { inject, injectable } from 'tsyringe';
import CriticalItems from '../infra/typeorm/entities/CriticalItems';
import ICriticalItemsRepository from '../repositories/ICriticalItemsRepository';

type GetItemsRequest = {
  part_number?: string;
};

@injectable()
export default class GetAllCriticalItemsService {
  constructor(
    @inject('CriticalItemsRepository')
    private criticalitmesRepository: ICriticalItemsRepository,
  ) {}

  public async execute({
    part_number,
  }: GetItemsRequest): Promise<CriticalItems[] | undefined> {
    const queryOptions = {};

    if (part_number) {
      Object.assign(queryOptions, {
        part_number,
      });
    }

    const criticalitems = await this.criticalitmesRepository.findAll(
      queryOptions,
    );

    return criticalitems;
  }
}
