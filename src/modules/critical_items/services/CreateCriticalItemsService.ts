import AppError from '@shared/errors/AppError';
import axios from 'axios';
import { inject, injectable } from 'tsyringe';
import { CriticalItems } from '../infra/typeorm/entities/CriticalItems';
import ICriticalItemsRepository from '../repositories/ICriticalItemsRepository';

type CriticalItemsRequest = {
  part_number: string;
  stock_obs: string;
  purchase_obs: string;
  used_obs: string;
  responsable: string;
};

type RegisterResponse = {
  CODIGO: string;
  DESCRICAO: string;
  LOCACAO: string;
  GRUPO: string;
  PP: string;
  LE: string;
  UM: string;
  ESTSEG: string;
  APROPRI: string;
  BLOQUEADO: string;
};

@injectable()
export default class CreateCriticalItemsService {
  constructor(
    @inject('CriticalItemsRepository')
    private criticalItemsRepository: ICriticalItemsRepository,
  ) {}

  async execute({
    part_number,
    stock_obs,
    purchase_obs,
    used_obs,
    responsable,
  }: CriticalItemsRequest): Promise<CriticalItems> {
    // axios
    const part_numberInformation = await axios.get<RegisterResponse[]>(
      `${process.env.APP_PROTHEUS_API_URL}/register`,
      {
        params: {
          filial: '0101',
          produto: part_number,
        },
      },
    );

    const criticalitems = await this.criticalItemsRepository.create({
      part_number,
      description: part_numberInformation.data[0].DESCRICAO,
      stock_obs,
      purchase_obs,
      used_obs,
      responsable,
    });

    if (!part_number) {
      throw new AppError('Part Number does not exits!');
    }

    return criticalitems;
  }
}
