import ICreateCriticalItemsDTO from '../dtos/ICreateCriticalItemsDTO';
import CriticalItems from '../infra/typeorm/entities/CriticalItems';

export default interface ICriticalItemsRepository {
  create(data: ICreateCriticalItemsDTO): Promise<CriticalItems>;
  findById(id: string): Promise<CriticalItems | undefined>;
  delete(critical_item: CriticalItems): Promise<void>;
  findAll(part_number: string): Promise<CriticalItems[]>;
  save(critical_item: CriticalItems): Promise<CriticalItems>;
}
