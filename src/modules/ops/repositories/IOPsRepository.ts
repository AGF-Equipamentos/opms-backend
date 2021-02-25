import ICreateOPDTO from '../dtos/ICreateDTO';
import OP from '../infra/typeorm/entities/OP';

export default interface IOPsRopository {
  create(data: ICreateOPDTO): Promise<OP>;
  findById(ticket_id: string): Promise<OP | undefined>;
  findAll(): Promise<OP[]>;
  save(op: OP): Promise<OP>;
  delete(op: OP): Promise<void>;
}
