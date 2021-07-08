import { Response, Request } from 'express';
import ListOPsService from '@modules/ops/services/ListOPsService';
import { container } from 'tsyringe';
import CreateOPService from '@modules/ops/services/CreateOPService';
import UpdateOPService from '@modules/ops/services/UpdateTicketService';
import DeleteOPService from '@modules/ops/services/DeleteOPService';
import ListOPsServiceByDepartment from '@modules/ops/services/ListOPsServiceByDepartment';

export default class OPsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { department } = request.query;

    const listOPs = container.resolve(ListOPsService);
    const listOPsByDepartment = container.resolve(ListOPsServiceByDepartment);

    if (department) {
      const opa = String(department).split(',');
      const ops = await listOPsByDepartment.execute({
        department: opa,
      });
      return response.json(ops);
    }

    const ops = await listOPs.execute();
    return response.json(ops);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { status, op_number } = request.body;
    const listOPs = container.resolve(CreateOPService);

    const op = await listOPs.execute({
      user_id,
      status,
      op_number,
    });

    return response.json(op);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { op_id } = request.params;
    const { status, op_number } = request.body;

    const updateOP = container.resolve(UpdateOPService);

    const op = await updateOP.execute({
      user_id,
      op_id,
      status,
      op_number,
    });

    return response.json(op);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { op_id } = request.params;

    const deleteOP = container.resolve(DeleteOPService);

    await deleteOP.execute({
      op_id,
    });

    return response.status(204).send();
  }
}
