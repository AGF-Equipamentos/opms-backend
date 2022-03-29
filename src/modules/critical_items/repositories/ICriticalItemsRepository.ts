import ICreateCriticalItemsDTO from '../dtos/ICreateCriticalItemsDTO';
import CriticalItems from '../infra/typeorm/entities/CriticalItems';

export type FindOptions = {
  part_number?: string;
  description?: string;
  responsable?: string;
};

export default interface ICriticalItemsRepository {
  create(data: ICreateCriticalItemsDTO): Promise<CriticalItems>;
  findById(id: string): Promise<CriticalItems | undefined>;
  delete(critical_item: CriticalItems): Promise<void>;
  findAll(options: FindOptions): Promise<CriticalItems[]>;
  save(critical_item: CriticalItems): Promise<CriticalItems>;
}
