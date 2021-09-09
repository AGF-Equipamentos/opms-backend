import { Response, Request } from 'express';
import { container } from 'tsyringe';
import UpdateCommitService from '@modules/commits/services/UpdateCommitService';
import ListCommitsByOpID from '@modules/commits/services/ListCommitsByOpID';
export default class CommitsController {

  public async index(request: Request, response: Response): Promise<Response> {
    console.log(request)
    const { op_id } = request.params;

    const listCommits = container.resolve(ListCommitsByOpID);
    const commits = await listCommits.execute( { op_id } );

    return response.json(commits);
    }

  public async update(request: Request, response: Response): Promise<Response> {
    const { commit_id } = request.params;
    const { qty_delivered } = request.body;
    const { user_id } = request.params;
    const { op_number } = request.params;

    const updateCommit = container.resolve(UpdateCommitService);

    const commit = await updateCommit.execute({
      commit_id,
      qty_delivered,
      user_id,
      op_number,
    });

    return response.json(commit);
  }
}