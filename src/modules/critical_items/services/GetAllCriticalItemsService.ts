import { inject, injectable } from 'tsyringe';
import CriticalItems from '../infra/typeorm/entities/CriticalItems';
import ICriticalItemsRepository from '../repositories/ICriticalItemsRepository';

type GetItemsRequest = {
  part_number?: string;
  description?: string;
  responsable?: string;
};

@injectable()
export default class GetAllCriticalItemsService {
  constructor(
    @inject('CriticalItemsRepository')
    private criticalitmesRepository: ICriticalItemsRepository,
  ) {}

  public async execute({
    part_number,
    description,
    responsable,
  }: GetItemsRequest): Promise<CriticalItems[] | undefined> {
    const queryOptions = {};

    if (part_number) {
      Object.assign(queryOptions, {
        part_number,
      });
    }
    if (description) {
      Object.assign(queryOptions, {
        description,
      });
    }
    if (responsable) {
      Object.assign(queryOptions, {
        responsable,
      });
    }

    const criticalitems = await this.criticalitmesRepository.findAll(
      queryOptions,
    );

    return criticalitems;
  }
}
