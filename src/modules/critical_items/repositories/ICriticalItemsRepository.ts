import ICreateCriticalItemsDTO from '../dtos/ICreateCriticalItemsDTO';
import CriticalItems from '../infra/typeorm/entities/CriticalItems';

export default interface ICriticalItemsRepository {
  create(data: ICreateCriticalItemsDTO): Promise<CriticalItems>;
}
