import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Commit from '@modules/commits/infra/typeorm/entities/Commit';
import ICommitsRepository from '@modules/commits/repositories/ICommitsRepository';
import IOPsRepository from '@modules/ops/repositories/IOPsRepository';

interface IRequest {
  commit_id: string;
  qty_delivered: number;
}

@injectable()
class UpdateCommitService {
  constructor(
    @inject('CommitsRepository')
    private commitsRepository: ICommitsRepository,
    @inject('OPsRepository')
    private opsRepository: IOPsRepository,
  ) {}

  public async execute({ commit_id, qty_delivered }: IRequest): Promise<Commit> {
    const commit = await this.commitsRepository.findById(commit_id);

    if (!commit) {
      throw new AppError('Commit does not exits');
    }
    
    const OP = await this.opsRepository.findById(
      commit.op_id,
      );

    commit.qty_delivered = qty_delivered

    const updatedCommit = await this.commitsRepository.save(commit);

    const commitsArray = await this.commitsRepository.getQttdsByOpID(commit.op_id);

    if (!commitsArray) {
      throw new AppError('Commits array does not exits');
    }

    const partialDelivery = commitsArray.some(commit => commit.qty === commit.qty_delivered)

    const allQttdsEqual = commitsArray.every(commit  => commit.qty === commit.qty_delivered)

    if (!OP) {
      throw new AppError('OP does not exits');
    }

    if (allQttdsEqual === true) {
      OP.status = 'Entregue'
    }
    else {
      if (partialDelivery === true) {
        OP.status = 'Entregue parcialmente' }
      else {
        OP.status = 'Entrega pendente'
           }
        }

      await this.opsRepository.save(OP);

      console.log(OP.status)
      console.log(partialDelivery)
      console.log(allQttdsEqual)

    return updatedCommit;
  }
}

export default UpdateCommitService;
