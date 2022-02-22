import CreateCriticalItemsService from '@modules/critical_items/services/CreateCriticalItemsService';
import DeleteCriticalItemsService from '@modules/critical_items/services/DeleteCriticalItemsService';
import GetAllCriticalItemsService from '@modules/critical_items/services/GetAllCriticalItemsService';
import UpdatePurchaseService from '@modules/critical_items/services/UpdatePurchaseServise';
import UpdateStockService from '@modules/critical_items/services/UpdateStockService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CriticalItemsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const GetAllCriticalItems = container.resolve(GetAllCriticalItemsService);

    const result = await GetAllCriticalItems.execute();

    return response.json(result);
  }

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { path } = request;

    const {
      part_number,
      stock_obs,
      purchase_obs,
      used_obs,
      responsable,
    } = request.body;

    if (path.split('/')[1] === 'stock') {
      const updateCriticalItems = container.resolve(UpdateStockService);
      const criticalitems = await updateCriticalItems.execute({
        id,
        stock_obs,
        used_obs,
      });
    } else {
      const updateCriticalItems = container.resolve(UpdatePurchaseService);
      const criticalitems = await updateCriticalItems.execute({
        id,
        purchase_obs,
        responsable,
      });
    }

    const updateCriticalItems = container.resolve(UpdateCriticalItemsService);

    const criticalitems = await updateCriticalItems.execute({
      id,
      part_number,
      stock_obs,
      purchase_obs,
      used_obs,
      responsable,
    });
    return response.json(criticalitems);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCriticalItems = container.resolve(DeleteCriticalItemsService);

    const result = await deleteCriticalItems.execute({ id });

    return response.json(result);
  }
}
