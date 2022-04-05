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
      { header: 'Número da Peça', key: 'part_number', width: 10 },
      { header: 'Descrição do Item', key: 'description', width: 10 },
      { header: 'Observação do Estoque', key: 'stock_obs', width: 10 },
      { header: 'Observação de Compras', key: 'purchase_obs', width: 10 },
      { header: 'Usado', key: 'used_obs', width: 10 },
      { header: 'Rsponsável', key: 'responsable', width: 10 },
      { header: 'Criado', key: 'created_at', width: 10 },
      { header: 'Ult.Atual', key: 'updated_at', width: 10 },
    ];

    criticalitems.forEach(critical_item => {
      worksheet.addRow(critical_item); // pra cada item criar um linha
    });

    worksheet.getRow(1).eachCell(cell => {
      const newCell = {
        ...cell,
        font: { bold: true },
      };

      return newCell;
    });

    return workbook;
  }
}
