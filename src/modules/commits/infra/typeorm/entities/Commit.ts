import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import OP from '@modules/ops/infra/typeorm/entities/OP';

@Entity('commits')
class Commit {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  op_id: string;

  @ManyToOne(() => OP)
  @JoinColumn({ name: 'op_id' })
  op: OP;

  @Column()
  part_number: string;

  @Column()
  qty: number;

  @Column()
  qty_delivered: number;

  @Column()
  location: string;

  @Column()
  warehouse: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Commit;
