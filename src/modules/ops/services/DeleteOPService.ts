import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IOPsRepository from '../repositories/IOPsRepository';

interface IRequest {
  op_id: string;
}

@injectable()
class UpdateOPService {
  constructor(
    @inject('OPsRepository')
    private opsRepository: IOPsRepository,
  ) {}

  public async execute({ op_id }: IRequest): Promise<void> {
    const op = await this.opsRepository.findById(op_id);

    if (!op) {
      throw new AppError('OP does not exits');
    }

    const updatedOP = await this.opsRepository.delete(op);

    return updatedOP;
  }
}

export default UpdateOPService;
