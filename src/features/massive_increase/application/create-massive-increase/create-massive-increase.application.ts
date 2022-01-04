import { BadRequestException, HttpException, Inject } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { EMassiveIncreaseStatus } from '../../domain/enums/massive-increase-status.enum';
import { IMassiveIncreaseRepository } from '../../infrastructure/repositories/massive-increase-repository.interface';
import { MassiveIncreaseTypes } from '../../massive-increase.types';
import { ICreateMassiveIncreaseApplication } from './create-massive-increase-app.interface';
import { LibrariesTypes } from 'src/features/shared/libraries/libraries.types';
import { WorkBook, WorkSheet } from 'xlsx';
import { EExcelToJsonPropertyName } from '../../domain/enums/excel-to-json-property-names.enum';
import { EValidExcelFileHeaders } from '../../domain/enums/valid-excel-file-headers.enum';
import { MassiveIncreaseDetail } from '../../domain/entities/massive.increase-detail.entity';
import { ValidateMassiveIncreaseApplication } from '../validate-massive-increase/validate-massive-increase.application';
import { MassiveIncreaseDto } from '../../infrastructure/dtos/massive-increase.dto';
import { MassiveIncrease } from '../../domain/entities/massive-increase.entity';
import { MassiveDecreaseTypes } from 'src/features/massive_decrease/massive-decrease.types';
import { IMassiveDecreaseRepository } from 'src/features/massive_decrease/infrastructure/repositories/massive-decrease-repository.interface';
import { MassiveDecrease } from 'src/features/massive_decrease/domain/entities/massive-decrease.entity';
import { EMassiveDecreaseStatus } from 'src/features/massive_decrease/domain/enums/massive-decrease-status.enum';

export class CreateMassiveIncreaseApplication implements ICreateMassiveIncreaseApplication {
  constructor(
    @Inject(MassiveIncreaseTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly massiveIncreaseRepository: IMassiveIncreaseRepository,
    @Inject(MassiveDecreaseTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly massiveDecreaseRepository: IMassiveDecreaseRepository,
    @Inject(MassiveIncreaseTypes.APPLICATION.VALIDATE_MASSIVE_INCREASE)
    private readonly validateMassiveIncreaseApplication: ValidateMassiveIncreaseApplication,
    @Inject(LibrariesTypes.XLSX) private readonly xlsx
  ) { }

  async execute(excelFile: Express.Multer.File, massiveIncreaseDto: MassiveIncreaseDto, req: RequestModel) {
    const { clientId, id } = req.admin;
    const { name, tokenId } = massiveIncreaseDto;
    
    if (!excelFile) throw new BadRequestException('excelFile should not be empty');
    const excelFileToJson = this.excelFileToJson(excelFile);
    
    const massiveIncreaseDetail: Array<MassiveIncreaseDetail> = excelFileToJson.map((json, i) => {
      return new MassiveIncreaseDetail({
        userId: json[EExcelToJsonPropertyName.A1_USER_ID],
        amount: json[EExcelToJsonPropertyName.B1_AMOUNT],
        note: json[EExcelToJsonPropertyName.C1_NOTE],
        id: i+1
      })
    })
    
    try {
      const increasesAndDecreasesInProgress = await this.findAllIncreasesAndDecreasesInProcessByClientId(clientId)
      if (increasesAndDecreasesInProgress.length > 0 ) throw new BadRequestException('there is already a running process')
      
      const massiveIncrease = new MassiveIncrease({
        adminId: id, 
        clientId,
        name, 
        tokenId, 
        status: EMassiveIncreaseStatus.CREATED,
        detail: massiveIncreaseDetail
      })

      const saveMassiveIncrease = await this.massiveIncreaseRepository.create(massiveIncrease);
      return this.validateMassiveIncreaseApplication.execute(saveMassiveIncrease, req);

    } catch (error) {
      throw new HttpException(error.message, error.status);      
    }
  }

  private async findAllIncreasesAndDecreasesInProcessByClientId(clientId: string): Promise<Array<MassiveIncrease | MassiveDecrease>> {
    const massiveIncreases: Array<MassiveIncrease> = await this.massiveIncreaseRepository.findAll({clientId});
    const massiveDecreases: Array<MassiveDecrease> = await this.massiveDecreaseRepository.findAll({clientId});
    const massiveIncreasesInProcess: Array<MassiveIncrease> = massiveIncreases.filter(massiveIncrease => massiveIncrease.status === EMassiveIncreaseStatus.PROCESSING);
    const massiveDecreasesInProcess: Array<MassiveDecrease> = massiveDecreases.filter(massiveDecrease => massiveDecrease.status === EMassiveDecreaseStatus.PROCESSING);
    return [...massiveIncreasesInProcess, ...massiveDecreasesInProcess]
  }
  
  private excelFileToJson(excelFile: Express.Multer.File): Array<{}> {
    const workbook: WorkBook = this.xlsx.read(excelFile.buffer);
    if (workbook.Props.Worksheets > 1) throw new BadRequestException('file should only contain one sheet');
    const worksheet: WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
    const dataToJson: Array<Object> = this.xlsx.utils.sheet_to_json(worksheet, {
      header: [
        EExcelToJsonPropertyName.A1_USER_ID,  
        EExcelToJsonPropertyName.B1_AMOUNT,
        EExcelToJsonPropertyName.C1_NOTE,
      ]
    });
    this.validateExcelFileHeader(dataToJson[0]);
    dataToJson.shift();
    if (dataToJson.length === 0) throw new BadRequestException('file must contain at least one row');
    return dataToJson;
  }
  
  private validateExcelFileHeader(header: Object): void {
    let errorMessage: Object[] = [];
    const validA1headerName: Array<string> = [EValidExcelFileHeaders.CUIT_CUIL, EValidExcelFileHeaders.DNI, EValidExcelFileHeaders.ID, EValidExcelFileHeaders.USUARIO_ID];
    const validB1headerName: Array<string> = [EValidExcelFileHeaders.MONTO]
    const validE1headerName: Array<string> = [EValidExcelFileHeaders.NOTA]
    if (!validA1headerName.includes(header[EExcelToJsonPropertyName.A1_USER_ID])) errorMessage.push({errorMessage: `header name A1 must have a valid name`, validName: validA1headerName })
    if (!validB1headerName.includes(header[EExcelToJsonPropertyName.B1_AMOUNT])) errorMessage.push({errorMessage: `header name B1 must have a valid name`, validName: validB1headerName })
    if (!validE1headerName.includes(header[EExcelToJsonPropertyName.C1_NOTE])) errorMessage.push({errorMessage: `header name C1 must have a valid name`, validName: validE1headerName })
    if (errorMessage.length > 0) throw new BadRequestException(errorMessage)
  }
}