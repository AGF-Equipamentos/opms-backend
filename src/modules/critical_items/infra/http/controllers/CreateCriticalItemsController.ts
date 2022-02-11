import CreateCriticalItemsService from '@modules/critical_items/services/CreateCriticalItemsService';
import { Request, Response } from 'express';

export default class CreateCriticalItemsController {
  async post(request: Request, response: Response): Promise<Response> {
    const {
      part_number,
      description,
      stock_obs,
      purchase_obs,
      used_obs,
      responsable,
    } = request.body;

    const service = new CreateCriticalItemsService();

    const result = await service.execute({
      part_number,
      description,
      stock_obs,
      purchase_obs,
      used_obs,
      responsable,
    });

    return response.json(result);
  }
}
