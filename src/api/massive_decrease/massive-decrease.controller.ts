import { BadRequestException, Body, Controller, Inject, Post, Request, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { RequestModel } from "src/features/admin/infrastructure/service/middleware/admin.middleware";
import { MassiveDecreaseTypes } from "src/features/massive_decrease/massive-decrease.types";
import { CreateMassiveDecreaseApplication } from "src/features/massive_decrease/application/create-massive-decrease/create-massive-decrease.application";
import { ProcessMassiveDecreaseApplication } from "src/features/massive_decrease/application/process-massive-decrease/process-massive-decrease.application";
import { CancelMassiveDecreaseApplication } from "src/features/massive_decrease/application/cancel-massive-decrease/cancel-massive-decrease.application";
import { MassiveDecreaseDto } from "src/features/massive_decrease/infrastructure/dtos/massive-decrease.dto";
import { EMassiveDecreaseAction } from "src/features/massive_decrease/domain/enums/massive-decrease-action.enum";

@Controller('decrease/massive')
export class MassiveDecreaseCotroller {
  
  constructor(
    @Inject(MassiveDecreaseTypes.APPLICATION.CREATE_MASSIVE_DECREASE)
    private readonly createMassiveDecreaseApplication: CreateMassiveDecreaseApplication,
    @Inject(MassiveDecreaseTypes.APPLICATION.PROCESS_MASSIVE_DECREASE)
    private readonly processMassiveDecreaseApplication: ProcessMassiveDecreaseApplication,
    @Inject(MassiveDecreaseTypes.APPLICATION.CANCEL_MASSIVE_DECREASE)
    private readonly cancelMassiveDecreaseApplication: CancelMassiveDecreaseApplication,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('excelFile', {
    limits: { fileSize: 3e+7 },
    fileFilter: (req, file, callback) => {
      const mimetypeValid = {
        xls: 'application/vnd.ms-excel',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }
      if(file.mimetype !== mimetypeValid.xls && file.mimetype !== mimetypeValid.xlsx) return callback (new BadRequestException('Invalid uploads: file format needs to be .xlsx or xls'), null);
      return callback(null, true);
    },
  }))
  async createProcessOrCancel(@UploadedFile() excelFile: Express.Multer.File, @Body() massiveDecreaseDto: MassiveDecreaseDto, @Request() req: RequestModel) {
    const { action } = massiveDecreaseDto;
    if ( action === EMassiveDecreaseAction.CREATE ) return this.createMassiveDecreaseApplication.execute(excelFile, massiveDecreaseDto, req);
    if ( action === EMassiveDecreaseAction.PROCESS ) return this.processMassiveDecreaseApplication.execute(massiveDecreaseDto, req);
    if ( action === EMassiveDecreaseAction.CANCEL ) return this.cancelMassiveDecreaseApplication.execute(massiveDecreaseDto);
  }
}