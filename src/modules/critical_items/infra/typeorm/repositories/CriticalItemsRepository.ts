import ICreateCriticalItemsDTO from '@modules/critical_items/dtos/ICreateCriticalItemsDTO';
import ICriticalItemsRepository from '@modules/critical_items/repositories/ICriticalItemsRepository';
import { getRepository, Repository } from 'typeorm';
import CriticalItems from '../entities/CriticalItems';

class CriticalItemsRepository implements ICriticalItemsRepository {
  private ormRepository: Repository<CriticalItems>;

  constructor() {
    this.ormRepository = getRepository(CriticalItems);
  }

  public async create({
    part_number,
    description,
    stock_obs,
    purchase_obs,
    used_obs,
    responsable,
  }: ICreateCriticalItemsDTO): Promise<CriticalItems> {
    console.log('repository');
    const critical = this.ormRepository.create({
      part_number,
      description,
      stock_obs,
      purchase_obs,
      used_obs,
      responsable,
    });

    await this.ormRepository.save(critical);

    return critical;
  }
}

export default CriticalItemsRepository;
