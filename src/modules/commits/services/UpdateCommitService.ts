import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Commit from '@modules/commits/infra/typeorm/entities/Commit';
import ICommitsRepository from '@modules/commits/repositories/ICommitsRepository';
import IOPsRepository from '@modules/ops/repositories/IOPsRepository';

interface IRequest {
  commit_id: string;
  qty_delivered: number;
  op_id: string;
}

@injectable()
class UpdateCommitService {
  constructor(
    @inject('CommitsRepository')
    private commitsRepository: ICommitsRepository,
    @inject('OPsRepository')
    private opsRepository: IOPsRepository,
  ) {}

  public async execute({ commit_id, qty_delivered, op_id }: IRequest): Promise<Commit> {
    const commit = await this.commitsRepository.findById(commit_id);
    
    if (!commit) {
      throw new AppError('Commit does not exits');
    }
    


    commit.qty_delivered = qty_delivered

    const commitsArray = await this.commitsRepository.findCommitsByOpID(commit.op_id);

    if (!commitsArray) {
      throw new AppError('Commits array does not exits');
    }
      
    // const result = commitsArray.map(commit => ({ qty: commit.qty, qty_delivered: commit.qty_delivered }), 
    // commit.qty == commit.qty_delivered ? console.log('Saldo = 0') : console.log(`Saldo = ${commit.qty - commit.qty_delivered}`)
    // );

    const balance_array = commitsArray.map((commit: { qty: any; qty_delivered: any; }) => {
      return commit.qty === commit.qty_delivered
    })

    console.log(balance_array)

    const partialDelivery = balance_array.some((balance: boolean) => balance === false)

    const allBalancesZero = balance_array.every(function(balance: boolean) {
      return balance === true;
})
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


    const op = await this.opsRepository.findById(op_id);

    if (!op) {
      throw new AppError('Op does not exits');
    }
    
    if (allBalancesZero === true) {   
      op.status = 'Entregue'
    }
    else {
      if (balance_array.some((balance: boolean) => balance === true)) {
        op.status = 'Parcialmente entregue' }
      else {
        op.status = 'Pendente'
           }
        }
        await this.opsRepository.save(op);


    return updatedCommit;
  }
}

export default UpdateCommitService;
