import ICreateCommitDTO from '../dtos/ICreateDTO';
import Commit from '../infra/typeorm/entities/Commit';

export type CommitStatus = Pick<Commit, 'qty' | 'qty_delivered'>;

export default interface ICommitsRepository {
  create(data: ICreateCommitDTO): Promise<Commit>;
  findCommitsByOpID(op_id: string): Promise<Commit[] | undefined>;
  findCommitsID(id: string[]): Promise<Commit[] | undefined>;
  getCommitsQtyByOpID(op_id: string): Promise<CommitStatus[] | undefined>;
  findById(id: string): Promise<Commit | undefined>;
  save(commit: Commit): Promise<Commit>;
  saveAll(commit: Commit[]): Promise<Commit[]>;
}
