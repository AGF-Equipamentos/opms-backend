import { inject, injectable } from 'tsyringe';
import OP from '../infra/typeorm/entities/OP';
import IOPsRepository from '../repositories/IOPsRepository';

interface IRequest {
  user_id: string;
  status: string;
  op_number: string;
}

@injectable()
class CreateOPService {
  constructor(
    @inject('OPsRepository')
    private opsRepository: IOPsRepository,
  ) {}

  public async execute({ user_id, status, op_number }: IRequest): Promise<OP> {
    const op = await this.opsRepository.create({
      user_id,
      status,
      op_number,
    });

    return op;
  }
}

export default CreateOPService;
