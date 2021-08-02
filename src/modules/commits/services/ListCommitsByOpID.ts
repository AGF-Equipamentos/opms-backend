import { inject, injectable } from 'tsyringe';
import Commit from '@modules/commits/infra/typeorm/entities/Commit';
import ICommitsRepository from '@modules/commits/repositories/ICommitsRepository';

interface IRequest {
  op_id: string;
}

@injectable()
class ListCommitsService {
  constructor(
    @inject('CommitsRepository')
    private commitsRepository: ICommitsRepository,
  ) {}

  public async execute({ op_id }: IRequest): Promise<Commit[] | undefined> {
    const commits = await this.commitsRepository.findCommitsByOpNumber(op_id);

    return commits;
  }
}

export default ListCommitsService;
