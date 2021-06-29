import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import OP from '../infra/typeorm/entities/OP';
import IOPsRepository from '../repositories/IOPsRepository';

interface IRequest {
  user_id: string;
  op_id: string;
  status: string;
  op_number: string;
}

@injectable()
class UpdateOPService {
  constructor(
    @inject('OPsRepository')
    private opsRepository: IOPsRepository,
  ) {}

  public async execute({ op_id, status, op_number }: IRequest): Promise<OP> {
    const op = await this.opsRepository.findById(op_id);

    if (!op) {
      throw new AppError('OP does not exits');
    }

    op.status = status;
    op.op_number = op_number;

    const updatedOP = await this.opsRepository.save(op);

    return updatedOP;
  }
}

export default UpdateOPService;
