import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Commit from '@modules/commits/infra/typeorm/entities/Commit';
import ICommitsRepository from '@modules/commits/repositories/ICommitsRepository';

interface IRequest {
  commit_id: string;
  qty_delivered: number;
}

@injectable()
class UpdateCommitService {
  constructor(
    @inject('CommitsRepository')
    private commitsRepository: ICommitsRepository,
  ) {}

  public async execute({ commit_id, qty_delivered }: IRequest): Promise<Commit> {
    const commit = await this.commitsRepository.findById(commit_id);

    if (!commit) {
      throw new AppError('Commit does not exits');
    }

    commit.qty_delivered = qty_delivered

    const updatedCommit = await this.commitsRepository.save(commit);

    return updatedCommit;
  }
}

export default UpdateCommitService;
