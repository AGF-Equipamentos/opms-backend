import { inject, injectable } from 'tsyringe';
import OP from '../infra/typeorm/entities/OP';
import IOPsRopository from '../repositories/IOPsRepository';

interface IRequest {
  department: string[];
}

@injectable()
class ListOPsService {
  constructor(
    @inject('OPsRepository')
    private opsRepository: IOPsRopository,
  ) {}

  public async execute({ department }: IRequest): Promise<OP[] | undefined> {
    const ops = await this.opsRepository.findByDepartment(department);

    return ops;
  }
}

export default ListOPsService;
