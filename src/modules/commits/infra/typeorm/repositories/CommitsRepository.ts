import ICreateCommitDTO from '@modules/commits/dtos/ICreateDTO';
import ICommitsRepository, { CommitStatus } from '@modules/commits/repositories/ICommitsRepository';
import { getRepository, Repository } from 'typeorm';
import Commit from '../entities/Commit';

class CommitsRepository implements ICommitsRepository {
  private ormRepository: Repository<Commit>;

  constructor() {
    this.ormRepository = getRepository(Commit);
  }

  public async findCommitsByOpID(op_id: string): Promise<Commit[] | undefined> {
    const commit = await this.ormRepository.find({
      where: { op_id }
    });

    return commit;
  }

  public async findCommitsID(id: string[]): Promise<Commit[] | undefined> {
    const commit = await this.ormRepository.find({
        where: id.map(id => {
        return { id: id };
      }),
  });

    return commit;
  }

  public async getCommitsQtyByOpID(op_id: string): Promise<CommitStatus[] | undefined> {
    const commit = await this.ormRepository.find({
      select: ["qty", "qty_delivered"],
      where: { op_id } 
    });

    return commit;
  }

  public async findById(id: string): Promise<Commit | undefined> {
    const commit = await this.ormRepository.findOne(id);

    return commit;
  }
    public async save(commit: Commit): Promise<Commit> {
      return this.ormRepository.save(commit);
    }

    public async saveAll(commit: Commit[]): Promise<Commit[]> {
      return this.ormRepository.save(commit);
    }

    public async create({
      part_number,
      qty_delivered,
      qty,
      description,
      warehouse,
      op_id,
      location,
    }: ICreateCommitDTO): Promise<Commit> {
      const commit = this.ormRepository.create({
        part_number,
        qty_delivered,
        qty,
        description,
        warehouse,
        op_id,
        location,
      });

      await this.ormRepository.save(commit);
      
      return commit;
    }
}

export default CommitsRepository;
