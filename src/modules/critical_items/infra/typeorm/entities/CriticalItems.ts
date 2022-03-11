import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('critical_items')
export class CriticalItems {
  @PrimaryColumn()
  id: string;

  @Column()
  part_number: string;

  @Column()
  description: string;

  @Column()
  stock_obs: string;

  @Column()
  purchase_obs: string;

  @Column()
  used_obs: string;

  @Column()
  responsable: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CriticalItems;
