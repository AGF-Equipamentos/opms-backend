import { Response, Request } from 'express';
import { container } from 'tsyringe';
import UpdateCommitService from '@modules/commits/services/UpdateCommitService';

export default class CommitsController {

  public async update(request: Request, response: Response): Promise<Response> {
    const { commit_id } = request.params;
    const { qty_delivered } = request.body;

    const updateCommit = container.resolve(UpdateCommitService);

    const commit = await updateCommit.execute({
      commit_id,
      qty_delivered,
    });

    return response.json(commit);
  }
}