import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MassiveIncreaseTypes } from 'src/features/massive_increase/massive-increase.types';
import { CreateMassiveIncreaseApplication } from 'src/features/massive_increase/application/create-massive-increase/create-massive-increase.application';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { EMassiveIncreaseAction } from 'src/features/massive_increase/domain/enums/massive-increase-action.enum';
import { ProcessMassiveIncreaseApplication } from 'src/features/massive_increase/application/process-massive-increase/process-massive-increase.application';
import { MassiveIncreaseDto } from 'src/features/massive_increase/infrastructure/dtos/massive-increase.dto';
import { CancelMassiveIncreaseApplication } from 'src/features/massive_increase/application/cancel-massive-increase/cancel-massive-increase.application';
import { GetAllMassiveIncreaseApplication } from 'src/features/massive_increase/application/get-all-massive-increase/get-all-massive-increase.application';
import { GetByIdMassiveIncreaseApplication } from 'src/features/massive_increase/application/get-by-id-massive-increase/get-by-id-massive-increase.application';
import { ApiResponse } from '@nestjs/swagger';
import { AuthResponse } from 'src/features/admin/infrastructure/models/auth-response.model';

@Controller('increase/massive')
export class MassiveIncreaseCotroller {
  constructor(
    @Inject(MassiveIncreaseTypes.APPLICATION.CREATE_MASSIVE_INCREASE)
    private readonly createMassiveIncreaseApplication: CreateMassiveIncreaseApplication,
    @Inject(MassiveIncreaseTypes.APPLICATION.PROCESS_MASSIVE_INCREASE)
    private readonly processMassiveIncreaseApplication: ProcessMassiveIncreaseApplication,
    @Inject(MassiveIncreaseTypes.APPLICATION.CANCEL_MASSIVE_INCREASE)
    private readonly cancelMassiveIncreaseApplication: CancelMassiveIncreaseApplication,
    @Inject(MassiveIncreaseTypes.APPLICATION.GET_ALL_MASSIVE_INCREASE)
    private readonly getAllMassiveIncreaseApplication: GetAllMassiveIncreaseApplication,
    @Inject(MassiveIncreaseTypes.APPLICATION.GET_BY_ID_MASSIVE_INCREASE)
    private readonly getByIdMassiveIncreaseApplication: GetByIdMassiveIncreaseApplication,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('excelFile', {
      limits: { fileSize: 3e7 },
      fileFilter: (req, file, callback) => {
        const mimetypeValid = {
          xls: 'application/vnd.ms-excel',
          xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        };
        if (file.mimetype !== mimetypeValid.xls && file.mimetype !== mimetypeValid.xlsx)
          return callback(
            new BadRequestException('Invalid uploads: file format needs to be .xlsx or xls'),
            null,
          );
        return callback(null, true);
      },
    }),
  )
  async createProcessOrCancel(
    @UploadedFile() excelFile: Express.Multer.File,
    @Body() massiveIncreaseDto: MassiveIncreaseDto,
    @Request() req: RequestModel,
  ) {
    const { action } = massiveIncreaseDto;
    if (action === EMassiveIncreaseAction.CREATE)
      return this.createMassiveIncreaseApplication.execute(excelFile, massiveIncreaseDto, req);
    if (action === EMassiveIncreaseAction.PROCESS)
      return this.processMassiveIncreaseApplication.execute(massiveIncreaseDto, req);
    if (action === EMassiveIncreaseAction.CANCEL)
      return this.cancelMassiveIncreaseApplication.execute(massiveIncreaseDto);
  }

  @Get('by-client-id')
  @ApiResponse({
    status: 201,
    description: 'Retorna todos los incrementos masivos relacionados a un clientId',
    type: AuthResponse,
  })
  findAll(@Request() req) {
    return this.getAllMassiveIncreaseApplication.execute(req);
  }

  @Get(':id')
  @ApiResponse({
    status: 201,
    description: 'Retorna un incremento masivo por su id',
    type: AuthResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Incremento masivo no encontrado',
    type: AuthResponse,
  })
  findById(@Param('id') id: string) {
    return this.getByIdMassiveIncreaseApplication.execute(id);
  }
}
