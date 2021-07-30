import ICreateOPDTO from '../dtos/ICreateDTO';
import OP from '../infra/typeorm/entities/OP';

export default interface IOPsRepository {
  create(data: ICreateOPDTO): Promise<OP>;
  findById(op_id: string): Promise<OP | undefined>;
  findByOpNumber(
    op_number: string,
    department: string,
  ): Promise<OP | undefined>;
  findByDepartment(department: string[]): Promise<OP[] | undefined>;
  findAll(): Promise<OP[]>;
  save(op: OP): Promise<OP>;
  delete(op: OP): Promise<void>;
}
