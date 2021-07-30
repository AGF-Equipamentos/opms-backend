import { inject, injectable } from 'tsyringe';
import Commit from '@modules/commits/infra/typeorm/entities/Commit';
import ICommitsRepository from '@modules/commits/repositories/ICommitsRepository';

interface IRequest {
  op: string;
}''

@injectable()
class ListCommitsService {
  constructor(
    @inject('CommitsRepository')
    private commitsRepository: ICommitsRepository,
  ) {}

  public async execute({ op }: IRequest): Promise<Commit[] | undefined> {
    const commits = await this.commitsRepository.findCommitsByOpNumber(op);

    return commits;
  }
}

export default ListCommitsService;
