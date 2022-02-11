import { Response, Request } from 'express';
import { container } from 'tsyringe';
import UpdateCommitService from '@modules/commits/services/UpdateCommitService';
import ListCommitsByOpID from '@modules/commits/services/ListCommitsByOpID';

export default class CommitsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { op_id } = request.params;

    const listCommits = container.resolve(ListCommitsByOpID);
    const commits = await listCommits.execute({ op_id });

    return response.json(commits);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { commitsUpdated } = request.body;

    const updateCommit = container.resolve(UpdateCommitService);
    const commits = await updateCommit.execute({ commitsUpdated });

    return response.json(commits);
  }
}
