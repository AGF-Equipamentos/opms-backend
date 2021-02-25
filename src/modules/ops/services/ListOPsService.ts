import { inject, injectable } from 'tsyringe';
import OP from '../infra/typeorm/entities/OP';
import IOPsRopository from '../repositories/IOPsRepository';

@injectable()
class ListOPsService {
  constructor(
    @inject('OPsRepository')
    private opsRepository: IOPsRopository,
  ) {}

  public async execute(): Promise<OP[]> {
    const ops = await this.opsRepository.findAll();

    return ops;
  }
}

export default ListOPsService;
