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

  public async execute({ commit_id, qty_delivered }: IRequest): Promise<Commit[]> {
    
    const request = [
      {
        commit_id: '1f1ec1c4-b7ca-472a-9cef-740979f122d9',
        qty_delivered: 1
      },
      {
        commit_id: 'e4ab8e01-dbfc-49a0-a4bf-d7361d3a421d',
        qty_delivered: 1
      },
      {
        commit_id: '4baad45c-76c8-4c4f-871f-a90065235abb',
        qty_delivered: 3
      },
    ]
    const ids = request.map(item => item.commit_id)

    const commit = await this.commitsRepository.findCommitsID(ids);
    
    if (!commit) {
      throw new AppError('Commit does not exits');
    }

    commit.map(commit => {
      request.find(commitData => commitData.commit_id === commit.id)
      return qty_delivered = commit.qty_delivered})

    const updatedCommit = await this.commitsRepository.saveAll(commit);

    // const commitsArray = await this.commitsRepository.getStatusByOpID(commit.op_id);

    // if (!commitsArray) {
    //   throw new AppError('Commits array does not exits');
    // }

    // const test = commitsArray.reduce((acc, commit) => {
    //   if(commit.qty === commit.qty_delivered) {
    //     acc.entregue = acc.entregue + 1 
    //     return acc
    //   }

    //   if(commit.qty_delivered === 0) {
    //     acc.pedente = acc.pedente + 1 
    //     return acc
    //   }

    //   acc.parcial = acc.parcial + 1 
    //   return acc
    // }, {
    //   pedente: 0,
    //   parcial: 0,
    //   entregue: 0
    // })

    // const op = await this.opsRepository.findById(
    //   commit.op_id,
    // );

    // if (!op) {
    //   throw new AppError('op does not exits');
    // }

    // if(test.parcial === 0 && test.pedente === 0 ) {
    //   op.status = 'Entregue'
    // } else {
    //   if (test.parcial >= 1 || test.entregue >= 1) {
    //     op.status = 'Entregue parcialmente'
    //   } else {
    //     op.status = 'Entrega pendente'
    //   }
    // }
      
    // await this.opsRepository.save(op);

    return updatedCommit;
  }
}

export default UpdateCommitService;
