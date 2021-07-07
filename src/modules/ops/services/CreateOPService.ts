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

@injectable()
class CreateOPService {
  constructor(
    @inject('OPsRepository')
    private opsRepository: IOPsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, status, op_number }: IRequest): Promise<OP> {
    const opFinded = await this.opsRepository.findByOpNumber(op_number);
    const user = await this.usersRepository.findById(user_id);

    if (opFinded) {
      throw new AppError('Essa OP já existe!');
    }

    if (!user) {
      throw new AppError('Esse usuário não existe!');
    }

    const opDetails = await axios({
      method: 'GET',
      url: `https://api.agfequipamentos.com.br/ops?filial=0101&opnumber=${op_number}`,
    });

    const op = await this.opsRepository.create({
      user_id,
      status,
      op_number,
      department: user.department,
      part_number: opDetails.data[0].PRODUTO,
      description: opDetails.data[0].DESCRICAO,
    });

    return op;
  }
}

export default CreateOPService;
