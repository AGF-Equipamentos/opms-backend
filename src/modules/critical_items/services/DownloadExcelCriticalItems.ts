import excelJS from 'exceljs';
import { inject, injectable } from 'tsyringe';
import { Like } from 'typeorm';
import ICriticalItemsRepository from '../repositories/ICriticalItemsRepository';

type DownloadItemsRequest = {
  part_number?: string;
  description?: string;
  responsable?: string;
};

@injectable()
export default class DownloadExcelCriticalItemsSevice {
  constructor(
    @inject('CriticalItemsRepository')
    private criticalitmesRepository: ICriticalItemsRepository,
  ) {}

  public async execute({
    part_number,
    description,
    responsable,
  }: DownloadItemsRequest): Promise<excelJS.Workbook | undefined> {
    const queryOptions = {};

    if (part_number) {
      Object.assign(queryOptions, {
        part_number: Like(`%${part_number}%`),
      });
    }
    if (description) {
      Object.assign(queryOptions, {
        description: Like(`%${description}%`),
      });
    }
    if (responsable) {
      Object.assign(queryOptions, {
        responsable: Like(`%${responsable}%`),
      });
    }

    const criticalitems = await this.criticalitmesRepository.findAll(
      queryOptions,
    );

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('Itens Críticos');

    worksheet.columns = [
      { header: 'Número da Peça', key: 'part_number', width: 15 },
      { header: 'Descrição do Item', key: 'description', width: 70 },
      { header: 'Observação do Estoque', key: 'stock_obs', width: 25 },
      { header: 'Observação de Compras', key: 'purchase_obs', width: 25 },
      { header: 'Usado', key: 'used_obs', width: 15 },
      { header: 'Rsponsável', key: 'responsable', width: 15 },
      { header: 'Criado', key: 'created_at', width: 15 },
      { header: 'Ult.Atual', key: 'updated_at', width: 15 },
    ];

    criticalitems.forEach(critical_item => {
      worksheet.addRow(critical_item); // pra cada item criar um linha
    });

    // http://localhost:3334/critical-items/download

    worksheet.getRow(1).eachCell({ includeEmpty: true }, cell => {
      Object.assign(
        cell,
        { font: { bold: true } },
        {
          fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'DAEEF3' },
          },
        },
      );
    });

    worksheet.eachRow(row =>
      row.eachCell(cell =>
        Object.assign(cell, {
          border: {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          },
        }),
      ),
    );

    return workbook;
  }
}
