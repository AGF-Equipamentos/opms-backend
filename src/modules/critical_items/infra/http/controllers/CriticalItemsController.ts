import CreateCriticalItemsService from '@modules/critical_items/services/CreateCriticalItemsService';
import DeleteCriticalItemsService from '@modules/critical_items/services/DeleteCriticalItemsService';
import DownloadExcelCriticalItemsSevice from '@modules/critical_items/services/DownloadExcelCriticalItems';
import GetAllCriticalItemsService from '@modules/critical_items/services/GetAllCriticalItemsService';
import UpdatePurchaseService from '@modules/critical_items/services/UpdatePurchaseServise';
import UpdateStockService from '@modules/critical_items/services/UpdateStockService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CriticalItemsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { part_number, description, responsable } = request.query;
    const GetAllCriticalItems = container.resolve(GetAllCriticalItemsService);
    const criticalItems = await GetAllCriticalItems.execute({
      part_number: part_number as string,
      description: description as string,
      responsable: responsable as string,
    });

    return response.json(criticalItems);
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
      part_number: part_number.toUpperCase().trim(),
      stock_obs: stock_obs.trim(),
      purchase_obs: purchase_obs.trim(),
      used_obs: used_obs.toUpperCase().trim(),
      responsable: responsable.toUpperCase().trim(),
    });

    return response.json(result);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { path } = request;

    const {
      stock_obs,
      purchase_obs,
      used_obs,
      responsable,
      description,
    } = request.body;

    let criticalitems = {};

    if (path.split('/')[1] === 'stock') {
      const updateCriticalItems = container.resolve(UpdateStockService);
      criticalitems = await updateCriticalItems.execute({
        id,
        description: description.toUpperCase().trim(),
        stock_obs: stock_obs.trim(),
        used_obs: used_obs.toUpperCase().trim(),
      });
    } else {
      const updateCriticalItems = container.resolve(UpdatePurchaseService);
      criticalitems = await updateCriticalItems.execute({
        id,
        description: description.toUpperCase().trim(),
        purchase_obs: purchase_obs.trim(),
        responsable: responsable.toUpperCase().trim(),
      });
    }

    return response.json(criticalitems);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCriticalItems = container.resolve(DeleteCriticalItemsService);

    const result = await deleteCriticalItems.execute({ id });

    return response.json(result);
  }

  public async download(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { part_number, description, responsable } = request.query;
    const DownloadExcelCriticalItems = container.resolve(
      DownloadExcelCriticalItemsSevice,
    );
    const workbook = await DownloadExcelCriticalItems.execute({
      part_number: part_number as string,
      description: description as string,
      responsable: responsable as string,
    });

    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=users.xlsx`,
    );

    await workbook?.xlsx.write(response).then(() => {
      response.status(200);
    });

    return response;
  }
}
