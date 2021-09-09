import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Commit from '@modules/commits/infra/typeorm/entities/Commit';
import ICommitsRepository from '@modules/commits/repositories/ICommitsRepository';
import IOPsRepository from '@modules/ops/repositories/IOPsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  commit_id: string;
  qty_delivered: number;
}

@injectable()
class UpdateCommitService {
  constructor(
    @inject('CommitsRepository')
    private commitsRepository: ICommitsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
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
      console.log(OP)

    commit.qty_delivered = qty_delivered

    const commitsArray = await this.commitsRepository.findCommitsByOpID(commit.op_id);

    if (!commitsArray) {
      throw new AppError('Commits array does not exits');
    }
      
    const balance_array = commitsArray.map((commit: { qty: any; qty_delivered: any; }) => {
      return commit.qty === commit.qty_delivered
    })

    console.log(balance_array)

    const partialDelivery = balance_array.some((balance: boolean) => balance === false)

    const allBalancesZero = balance_array.every((balance: boolean) => balance === true)
    // if(se tudo é true) {
    //   entregue
    // } else {
    //   if(se existe um true no meios dos false){
    //     parcialemnte entregue
    //   } else {
    //     pendente
    //   }
    // }

    console.log(partialDelivery)

    commit.qty_delivered = qty_delivered;

    const updatedCommit = await this.commitsRepository.save(commit);

    if (!OP) {
      throw new AppError('OP does not exits');
    }

    if (allBalancesZero === true) {
      OP.status = 'Entregue'
    }
    else {
      if (balance_array.some((balance: boolean) => balance === true)) {
        OP.status = 'Entregue parcialmente' }
      else {
        OP.status = 'Entrega pendente'
           }
        }

      await this.opsRepository.save(OP);
      console.log(OP)
      console.log(OP.status)

    return updatedCommit;
  }
}

export default UpdateCommitService;
