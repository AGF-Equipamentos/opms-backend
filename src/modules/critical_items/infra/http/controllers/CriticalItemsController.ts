import CreateCriticalItemsService from '@modules/critical_items/services/CreateCriticalItemsService';
import DeleteCriticalItemsService from '@modules/critical_items/services/DeleteCriticalItemsService';
import GetAllCriticalItemsService from '@modules/critical_items/services/GetAllCriticalItemsService';
import UpdateCriticalItemsService from '@modules/critical_items/services/UpdateCriticalItemsServise';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CriticalItemsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      part_number,
      stock_obs,
      purchase_obs,
      used_obs,
      responsable,
    } = request.body;

    const createCriticalItem = container.resolve(CreateCriticalItemsService);
    const result = await createCriticalItem.execute({
      part_number,
      stock_obs,
      purchase_obs,
      used_obs,
      responsable,
    });

    return response.json(result);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCriticalItems = container.resolve(DeleteCriticalItemsService);

    const result = await deleteCriticalItems.execute({ id });

    return response.json(result);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const GetAllCriticalItems = container.resolve(GetAllCriticalItemsService);

    const result = await GetAllCriticalItems.execute();

    return response.json(result);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      part_number,
      stock_obs,
      purchase_obs,
      used_obs,
      responsable,
    } = request.body;

    const updateCriticalItems = container.resolve(UpdateCriticalItemsService);
    const criticalitems = await updateCriticalItems.execute({
      part_number,
      stock_obs,
      purchase_obs,
      used_obs,
      responsable,
    });
    return response.json(criticalitems);
  }
}
