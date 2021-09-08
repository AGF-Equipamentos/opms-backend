import ICreateCommitDTO from '../dtos/ICreateDTO';
import Commit from '../infra/typeorm/entities/Commit';

export default interface ICommitsRepository {
  create(data: ICreateCommitDTO): Promise<Commit>;
  findCommitsByOpID(op_id: string): Promise<Commit[] | undefined>;
  findById(id: string): Promise<Commit | undefined>;
  save(commit: Commit): Promise<Commit>;
}
