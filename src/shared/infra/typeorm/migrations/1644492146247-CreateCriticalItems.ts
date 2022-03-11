import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateCriticalItems1644492146247
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'critical_items',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'part_number',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'stock_obs',
            type: 'varchar',
          },
          {
            name: 'purchase_obs',
            type: 'varchar',
          },
          {
            name: 'used_obs',
            type: 'varchar',
          },
          {
            name: 'responsable',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('critical_items');
  }
}
