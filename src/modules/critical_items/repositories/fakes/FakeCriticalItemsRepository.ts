import { uuid } from 'uuidv4';
import ICriticalItemsRepository, {
  FindOptions,
} from '@modules/critical_items/repositories/ICriticalItemsRepository';
import ICreateCriticalItemsDTO from '@modules/critical_items/dtos/ICreateCriticalItemsDTO';
import CriticalItems from '@modules/critical_items/infra/typeorm/entities/CriticalItems';

class FakeCriticalItemsRepository implements ICriticalItemsRepository {
  private critical_items: CriticalItems[] = [];

  public async findById(id: string): Promise<CriticalItems | undefined> {
    const findCritical_items = this.critical_items.find(
      critical_items => critical_items.id === id,
    );

    return findCritical_items;
  }

  public async create({
    part_number,
    description,
    stock_obs,
    purchase_obs,
    used_obs,
    responsable,
  }: ICreateCriticalItemsDTO): Promise<CriticalItems> {
    const critical_items = new CriticalItems();

    Object.assign(critical_items, {
      id: uuid(),
      part_number,
      description,
      stock_obs,
      purchase_obs,
      used_obs,
      responsable,
    });

    this.critical_items.push(critical_items);

    return critical_items;
  }

  public async delete(critical_item: CriticalItems): Promise<void> {
    const findIndex = this.critical_items.findIndex(
      findCritical_items => findCritical_items.id === critical_item.id,
    );
    this.critical_items.splice(findIndex, 1);
  }

  public async findAll(options?: FindOptions): Promise<CriticalItems[]> {
    const filterItems = this.critical_items.filter(critical_items => {
      if (options?.part_number) {
        const pnValidation = critical_items.part_number?.includes(
          options?.part_number?._value.slice(1, -1) as string,
        );
        if (!pnValidation) {
          return false;
        }
      }

      if (options?.description) {
        const pnValidation = critical_items.description?.includes(
          options?.description?._value.slice(1, -1) as string,
        );
        if (!pnValidation) {
          return false;
        }
      }

      if (options?.responsable) {
        const pnValidation = critical_items.responsable?.includes(
          options?.responsable?._value.slice(1, -1) as string,
        );
        if (!pnValidation) {
          return false;
        }
      }

      return true;
    });

    return filterItems;
  }

  public async save(critical_item: CriticalItems): Promise<CriticalItems> {
    const findIndex = this.critical_items.findIndex(
      findCritical_items => findCritical_items.id === critical_item.id,
    );
    this.critical_items[findIndex] = critical_item;

    return critical_item;
  }
}
export default FakeCriticalItemsRepository;
