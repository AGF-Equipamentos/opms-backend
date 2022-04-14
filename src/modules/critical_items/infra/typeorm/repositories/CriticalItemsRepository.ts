import ICreateCriticalItemsDTO from '@modules/critical_items/dtos/ICreateCriticalItemsDTO';
import ICriticalItemsRepository, {
  FindOptions,
} from '@modules/critical_items/repositories/ICriticalItemsRepository';
import { FindManyOptions, getRepository, Repository } from 'typeorm';
import CriticalItems from '../entities/CriticalItems';

class CriticalItemsRepository implements ICriticalItemsRepository {
  private criticalItemsRepository: Repository<CriticalItems>;

  constructor() {
    this.criticalItemsRepository = getRepository(CriticalItems);
  }

  public async findById(id: string): Promise<CriticalItems | undefined> {
    const criticalItems = await this.criticalItemsRepository.findOne(id);
    return criticalItems;
  }

  public async create({
    part_number,
    description,
    stock_obs,
    purchase_obs,
    used_obs,
    responsable,
  }: ICreateCriticalItemsDTO): Promise<CriticalItems> {
    const critical = this.criticalItemsRepository.create({
      part_number,
      description,
      stock_obs,
      purchase_obs,
      used_obs,
      responsable,
    });

    await this.criticalItemsRepository.save(critical);

    return critical;
  }

  public async delete(critical_item: CriticalItems): Promise<void> {
    await this.criticalItemsRepository.remove(critical_item);
  }

  public async findAll(options?: FindOptions): Promise<CriticalItems[]> {
    const criticalItems = await this.criticalItemsRepository.find(
      options as FindManyOptions,
    );

    return criticalItems;
  }

  public async save(critical_item: CriticalItems): Promise<CriticalItems> {
    return this.criticalItemsRepository.save(critical_item);
  }
}

export default CriticalItemsRepository;
