import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Commit from '@modules/commits/infra/typeorm/entities/Commit';
import ICommitsRepository from '@modules/commits/repositories/ICommitsRepository';
import IOPsRepository from '@modules/ops/repositories/IOPsRepository';

interface IRequest {
  commitsUpdated: {
    commit_id: string;
    qty_delivered: number;
  }[];
}

@injectable()
class UpdateCommitService {
  constructor(
    @inject('CommitsRepository')
    private commitsRepository: ICommitsRepository,
    @inject('OPsRepository')
    private opsRepository: IOPsRepository,
  ) {}

  public async execute({ commitsUpdated }: IRequest): Promise<Commit[]> {
    const commitsIds = commitsUpdated.map(item => item.commit_id);

    const commit = await this.commitsRepository.findCommitsID(commitsIds);

    if (!commit) {
      throw new AppError('Commit does not exits');
    }

    commit.map(commit => {
      const commitsComparison = commitsUpdated.find(
        (commitData: { commit_id: string }) =>
          commitData.commit_id === commit.id,
      );
      if (commitsComparison) {
        commit.qty_delivered = commitsComparison.qty_delivered;
        return commit;
      }
      return commit;
    });

    const updatedCommit = await this.commitsRepository.saveAll(commit);

    const commitsArray = await this.commitsRepository.getCommitsQtyByOpID(
      commit[0].op_id,
    );

    if (!commitsArray) {
      throw new AppError('Commits array does not exits');
    }

    const deliveredBalance = commitsArray.reduce(
      (acc, commit) => {
        if (commit.qty === commit.qty_delivered) {
          acc.entregue = acc.entregue + 1;
          return acc;
        }

        if (commit.qty_delivered === 0) {
          acc.pedente = acc.pedente + 1;
          return acc;
        }

        acc.parcial = acc.parcial + 1;
        return acc;
      },
      {
        pedente: 0,
        parcial: 0,
        entregue: 0,
      },
    );
    const op = await this.opsRepository.findById(commit[0].op_id);

    if (!op) {
      throw new AppError('op does not exits');
    }

    if (deliveredBalance.parcial === 0 && deliveredBalance.pedente === 0) {
      op.status = 'Entregue';
    } else {
      if (deliveredBalance.parcial >= 1 || deliveredBalance.entregue >= 1) {
        op.status = 'Entregue parcialmente';
      } else {
        op.status = 'Entrega pendente';
      }
    }

    await this.opsRepository.save(op);

    return updatedCommit;
  }
}

export default UpdateCommitService;
