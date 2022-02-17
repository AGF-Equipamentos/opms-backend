import ICreateCriticalItemsDTO from '../dtos/ICreateCriticalItemsDTO';
import CriticalItems from '../infra/typeorm/entities/CriticalItems';

export default interface ICriticalItemsRepository {
  create(data: ICreateCriticalItemsDTO): Promise<CriticalItems>;
  findById(id: string): Promise<CriticalItems | undefined>;
  delete(id: CriticalItems): Promise<void>;
  findAll(): Promise<CriticalItems[]>;
  save(id: CriticalItems): Promise<CriticalItems>;
}
