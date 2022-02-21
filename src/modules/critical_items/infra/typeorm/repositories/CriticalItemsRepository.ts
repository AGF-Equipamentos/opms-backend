import ICreateCriticalItemsDTO from '@modules/critical_items/dtos/ICreateCriticalItemsDTO';
import ICriticalItemsRepository from '@modules/critical_items/repositories/ICriticalItemsRepository';
import { getRepository, Repository } from 'typeorm';
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

  public async delete(id: CriticalItems): Promise<void> {
    await this.criticalItemsRepository.remove(id);
  }

  public async findAll(): Promise<CriticalItems[]> {
    const criticalItems = await this.criticalItemsRepository.find();
    return criticalItems;
  }

  public async save(id: CriticalItems): Promise<CriticalItems> {
    return this.criticalItemsRepository.save(id);
  }
}

export default CriticalItemsRepository;
