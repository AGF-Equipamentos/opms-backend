import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICriticalItemsRepository from '../repositories/ICriticalItemsRepository';

type CriticalItemsRequest = {
  id: string;
};

@injectable()
export default class DeleteCriticalItemsService {
  constructor(
    @inject('CriticalItemsRepository')
    private criticalItemsRepository: ICriticalItemsRepository,
  ) {}

  public async execute({ id }: CriticalItemsRequest): Promise<void> {
    const criticalItems = await this.criticalItemsRepository.findById(id);

    if (!criticalItems) {
      throw new AppError('Part Number does not exits!');
    }

    const deleteCriticalItems = this.criticalItemsRepository.delete(
      criticalItems,
    );

    return deleteCriticalItems;
  }
}
