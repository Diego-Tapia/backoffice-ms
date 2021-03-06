import { BadRequestException, HttpException, Inject } from '@nestjs/common';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { IMassiveIncreaseRepository } from '../../../infrastructure/repositories/massive-increase/massive-increase-repository.interface';
import { ICreateMassiveIncreaseApplication } from './create-massive-increase-app.interface';
import { LibrariesTypes } from 'src/features/shared/libraries/libraries.types';
import { WorkBook, WorkSheet } from 'xlsx';
import { ValidateMassiveIncreaseApplication } from '../validate-massive-increase/validate-massive-increase.application';
import { IMassiveDecreaseRepository } from 'src/features/transaction/infrastructure/repositories/massive-decrease/massive-decrease-repository.interface';
import { TokenTypes } from 'src/features/token/token.types';
import { ITokenRepository } from 'src/features/token/infrastructure/repositories/token-repository.interface';
import { CommonTypes } from 'src/features/shared/common/common.types';
import { IHelperService } from 'src/features/shared/common/infrastructure/services/helper-service/helper-service.interface';
import { EExcelToJsonPropertyName } from 'src/features/transaction/domain/enums/excel-to-json-property-names.enum';
import { EValidExcelFileHeaders } from 'src/features/transaction/domain/enums/valid-excel-file-headers.enum';
import { TransactionTypes } from 'src/features/transaction/transaction.types';
import { CreateMassiveDto } from 'src/features/transaction/infrastructure/dtos/create-massive.dto';
import { EMassiveStatus } from 'src/features/transaction/domain/enums/massive-status.enum';
import { MassiveDetail } from 'src/features/transaction/domain/entities/massive-detail.entity';
import { Massive } from 'src/features/transaction/domain/entities/massive.entity';

export class CreateMassiveIncreaseApplication implements ICreateMassiveIncreaseApplication {
  constructor(
    @Inject(TransactionTypes.INFRASTRUCTURE.MASSIVE_INCREASE_REPOSITORY)
    private readonly massiveIncreaseRepository: IMassiveIncreaseRepository,
    @Inject(TransactionTypes.INFRASTRUCTURE.MASSIVE_DECREASE_REPOSITORY)
    private readonly massiveDecreaseRepository: IMassiveDecreaseRepository,
    @Inject(TokenTypes.INFRASTRUCTURE.REPOSITORY)
    private readonly tokenRepository: ITokenRepository,
    @Inject(TransactionTypes.APPLICATION.VALIDATE_MASSIVE_INCREASE)
    private readonly validateMassiveIncreaseApplication: ValidateMassiveIncreaseApplication,
    @Inject(LibrariesTypes.XLSX) private readonly xlsx,
    @Inject(CommonTypes.INFRASTRUCTURE.HELPER_SERVICE)
    private readonly helperService: IHelperService,
  ) { }

  async execute(excelFile: Express.Multer.File, createMassiveDto: CreateMassiveDto, req: RequestModel) {
    const { clientId, id } = req.admin;
    const { name, tokenId } = createMassiveDto;
    
    if (!excelFile) throw new BadRequestException('excelFile should not be empty');
    const excelFileToJson = this.excelFileToJson(excelFile);
    
    const massiveIncreaseDetail: Array<MassiveDetail> = excelFileToJson.map((json, i) => {
      return new MassiveDetail({
        userId: json[EExcelToJsonPropertyName.A1_USER_ID],
        amount: json[EExcelToJsonPropertyName.B1_AMOUNT],
        note: json[EExcelToJsonPropertyName.C1_NOTE],
        id: i+1
      })
    })
    
    try {
      if (!this.helperService.isValidObjectId(tokenId)) throw new BadRequestException('id inv??lido');

      if (await this.massivesInProgress(clientId)) throw new BadRequestException('there is already a running process')

      const token = await this.tokenRepository.findOne({_id: tokenId, clientId})
      if (!token) throw new BadRequestException('El activo no se encuentra');
      if (!token.isActive()) throw new BadRequestException('El estado del activo debe ser ACTIVE');

      const massiveIncrease = new Massive({
        adminId: id, 
        clientId,
        name, 
        tokenId, 
        status: EMassiveStatus.CREATED,
        detail: massiveIncreaseDetail
      })

      const saveMassiveIncrease = await this.massiveIncreaseRepository.create(massiveIncrease);
      return this.validateMassiveIncreaseApplication.execute(saveMassiveIncrease, req);

    } catch (error) {
      throw new HttpException(error.message, error.status);      
    }
  }

  private async massivesInProgress(clientId: string): Promise<boolean> {
    const massiveIncreases = await this.massiveIncreaseRepository.findOne({clientId, status: EMassiveStatus.PROCESSING})
    const massiveDecreases = await this.massiveDecreaseRepository.findOne({clientId, status: EMassiveStatus.PROCESSING})
    return (massiveIncreases || massiveDecreases) ? true : false;
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
 
    if (!validA1headerName.includes(header[EExcelToJsonPropertyName.A1_USER_ID])) 
      errorMessage.push({errorMessage: `header name A1 must have a valid name`, validName: validA1headerName })
    if (!validB1headerName.includes(header[EExcelToJsonPropertyName.B1_AMOUNT])) 
      errorMessage.push({errorMessage: `header name B1 must have a valid name`, validName: validB1headerName })
    if (!validE1headerName.includes(header[EExcelToJsonPropertyName.C1_NOTE])) 
      errorMessage.push({errorMessage: `header name C1 must have a valid name`, validName: validE1headerName })
 
    if (errorMessage.length > 0) throw new BadRequestException(errorMessage)
  }
}