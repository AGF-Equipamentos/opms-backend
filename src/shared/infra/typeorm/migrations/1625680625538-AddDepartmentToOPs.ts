import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddDepartmentToOPs1625680625538
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'ops',
      new TableColumn({
        name: 'department',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('ops', 'department');
  }
}
