import Commit from '@modules/commits/infra/typeorm/entities/Commit';
import ICommitsRepository from '@modules/commits/repositories/ICommitsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import axios from 'axios';
import { inject, injectable } from 'tsyringe';
import OP from '../infra/typeorm/entities/OP';
import IOPsRepository from '../repositories/IOPsRepository';

interface IRequest {
  user_id: string;
  status: string;
  op_number: string;
}

interface ICommit {
  CODIGO: string;
  DESCRICAO: string;
  ARMAZEM: string;
  LOCACAO: string;
  QUANTIDADE: number;
  SALDO: number;
  OP: string;
  DEC_OP: string;
  ENTREGA: string;
}

interface returnCreatedCommits extends OP {
  commits: Commit[];
}

@injectable()
class CreateOPService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;

  constructor(
    @inject('OPsRepository')
    private opsRepository: IOPsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CommitsRepository')
    private commitsRepository: ICommitsRepository,
  ) {}

  public async execute({
    user_id,
    status,
    op_number,
  }: IRequest): Promise<returnCreatedCommits> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Esse usuário não existe!');
    }

    const opFinded = await this.opsRepository.findByOpNumber(
      op_number,
      user.department,
    );

    if (opFinded) {
      if (opFinded.department === user?.department) {
        throw new AppError('Essa OP já existe!');
      }
    }

    const opDetails = await axios({
      method: 'GET',
      url: `${process.env.APP_PROTHEUS_API_URL}/ops?filial=0101&opnumber=${op_number}`,
    });

    const op = await this.opsRepository.create({
      user_id,
      status,
      op_number,
      department: user.department,
      part_number: opDetails.data[0].PRODUTO,
      description: opDetails.data[0].DESCRICAO,
    });

    const responseCommits = await axios({
      method: 'GET',
      url: `${process.env.APP_PROTHEUS_API_URL}/emp?filial=0101&kanban=false&supermercado=true&op=${op_number}`,
    });

    const commitsArray = responseCommits.data;

    const commits: Commit[] = await Promise.all(
      commitsArray.map(
        async (commit: ICommit): Promise<Commit> => {
          const commitCreated = await this.commitsRepository.create({
            op_id: op.id,
            part_number: commit.CODIGO,
            qty: commit.QUANTIDADE,
            qty_delivered: 0,
            location: commit.LOCACAO,
            description: commit.DESCRICAO,
            warehouse: commit.ARMAZEM,
          });
          return commitCreated;
        },
      ),
    );

    const opWithCommits = {
      ...op,
      commits,
    };

    return opWithCommits;
  }
}

export default CreateOPService;
