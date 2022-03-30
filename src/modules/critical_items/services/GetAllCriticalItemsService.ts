// import { Postgres } from '@sentry/tracing/dist/integrations';
import { inject, injectable } from 'tsyringe';
// import { Like } from 'typeorm';
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
    //    Utilizar o Like aqui
    // const queryOptions = await dataSource(Postgres).findAll({
    //   part_number: Like('%a'),
    //   description: Like('%a'),
    //   responsable: Like('%a'),
    // });

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

    //  console.log(queryOptions);
    const criticalitems = await this.criticalitmesRepository.findAll(
      queryOptions,
    );

    return criticalitems;
  }
}
