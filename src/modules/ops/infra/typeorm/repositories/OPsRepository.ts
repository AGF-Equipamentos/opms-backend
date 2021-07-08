import ICreateOPDTO from '@modules/ops/dtos/ICreateDTO';
import IOPsRopository from '@modules/ops/repositories/IOPsRepository';
import { getRepository, Repository } from 'typeorm';
import OP from '../entities/OP';

class OPsRepository implements IOPsRopository {
  private ormRepository: Repository<OP>;

  constructor() {
    this.ormRepository = getRepository(OP);
  }

  public async create({
    user_id,
    status,
    department,
    op_number,
    part_number,
    description,
  }: ICreateOPDTO): Promise<OP> {
    const op = this.ormRepository.create({
      user_id,
      status,
      department,
      op_number,
      part_number,
      description,
    });

    await this.ormRepository.save(op);

    const opFinded = await this.findById(op.id);

    if (opFinded) {
      return opFinded;
    }

    return op;
  }

  public async findById(op_id: string): Promise<OP | undefined> {
    const op = await this.ormRepository.findOne(op_id, {
      relations: ['user'],
    });

    return op;
  }

  public async findByOpNumber(
    op_number: string,
    department: string,
  ): Promise<OP | undefined> {
    const op = await this.ormRepository.findOne({
      where: { op_number, department },
    });

    return op;
  }

  public async findByDepartment(
    department: string[],
  ): Promise<OP[] | undefined> {
    const ops = await this.ormRepository.find({
      where: department.map(departmentItem => {
        return { department: departmentItem };
      }),
      relations: ['user'],
    });

    return ops;
  }

  public async findAll(): Promise<OP[]> {
    const ops = await this.ormRepository.find({ relations: ['user'] });

    return ops;
  }

  public async save(op: OP): Promise<OP> {
    return this.ormRepository.save(op);
  }

  public async delete(op: OP): Promise<void> {
    await this.ormRepository.remove(op);
  }
}

export default OPsRepository;
