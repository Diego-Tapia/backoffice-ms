import { BadRequestException, Body, Controller, Get, Inject, Param, Post, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { IIndividualDecreaseApplication } from 'src/features/transaction/application/individual-decrease/individual-decrease-app.interface';
import { IIndividualIncreaseApplication } from 'src/features/transaction/application/individual-increase/individual-increase-app.interface';
import { CancelMassiveDecreaseApplication } from 'src/features/transaction/application/massive-decrease/cancel-massive-decrease/cancel-massive-decrease.application';
import { CreateMassiveDecreaseApplication } from 'src/features/transaction/application/massive-decrease/create-massive-decrease/create-massive-decrease.application';
import { GetAllMassiveDecreaseApplication } from 'src/features/transaction/application/massive-decrease/get-all-massive-decrease/get-all-massive-decrease.application';
import { GetMassiveDecreaseByIdApplication } from 'src/features/transaction/application/massive-decrease/get-massive-decrease-by-id/get-massive-decrease-by-id.application';
import { ProcessMassiveDecreaseApplication } from 'src/features/transaction/application/massive-decrease/process-massive-decrease/process-massive-decrease.application';
import { CancelMassiveIncreaseApplication } from 'src/features/transaction/application/massive-increase/cancel-massive-increase/cancel-massive-increase.application';
import { CreateMassiveIncreaseApplication } from 'src/features/transaction/application/massive-increase/create-massive-increase/create-massive-increase.application';
import { GetAllMassiveIncreaseApplication } from 'src/features/transaction/application/massive-increase/get-all-massive-increase/get-all-massive-increase.application';
import { GetMassiveIncreaseByIdApplication } from 'src/features/transaction/application/massive-increase/get-massive-increase-by-id/get-massive-increase-by-id.application';
import { ProcessMassiveIncreaseApplication } from 'src/features/transaction/application/massive-increase/process-massive-increase/process-massive-increase.application';
import { EMassiveAction } from 'src/features/transaction/domain/enums/massive-action.enum';
import { CreateIndividualDto } from 'src/features/transaction/infrastructure/dtos/create-individual.dto';
import { CreateMassiveDto } from 'src/features/transaction/infrastructure/dtos/create-massive.dto';
import { TransactionTypes } from 'src/features/transaction/transaction.types';
import { ICreateTransactionTypeApplication } from 'src/features/transaction/application/create-transaction-type/create-transaction-type-app.interface';
import { CreateTransactionTypeDto } from 'src/features/transaction/infrastructure/dtos/create-transaction-type.dto';
import { IGetAllTransactionApplication } from 'src/features/transaction/application/transaction/get-all-transaction/get-all-transaction-app.interface';
import { IGetTransactionByIdApplication } from 'src/features/transaction/application/transaction/get-transaction-by-id/get-transaction-by-id-app.interface';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  
  constructor(
    // INIDIVIDUAL
    @Inject(TransactionTypes.APPLICATION.INDIVIDUAL_DECREASE)
    private readonly individualDecreaseApplication: IIndividualDecreaseApplication,
    @Inject(TransactionTypes.APPLICATION.INDIVIDUAL_INCREASE)
    private readonly individualIncreaseApplication: IIndividualIncreaseApplication,
    
    // MASSIVE DECREASE 
    @Inject(TransactionTypes.APPLICATION.CREATE_MASSIVE_DECREASE)
    private readonly createMassiveDecreaseApplication: CreateMassiveDecreaseApplication,
    @Inject(TransactionTypes.APPLICATION.PROCESS_MASSIVE_DECREASE)
    private readonly processMassiveDecreaseApplication: ProcessMassiveDecreaseApplication,
    @Inject(TransactionTypes.APPLICATION.CANCEL_MASSIVE_DECREASE)
    private readonly cancelMassiveDecreaseApplication: CancelMassiveDecreaseApplication,
    @Inject(TransactionTypes.APPLICATION.GET_ALL_MASSIVE_DECREASE)
    private readonly getAllMassiveDecreaseApplication: GetAllMassiveDecreaseApplication,
    @Inject(TransactionTypes.APPLICATION.GET_MASSIVE_DECREASE_BY_ID)
    private readonly getMassiveDecreaseByIdApplication: GetMassiveDecreaseByIdApplication,

    // MASSIVE INCREASE
    @Inject(TransactionTypes.APPLICATION.CREATE_MASSIVE_INCREASE)
    private readonly createMassiveIncreaseApplication: CreateMassiveIncreaseApplication,
    @Inject(TransactionTypes.APPLICATION.PROCESS_MASSIVE_INCREASE)
    private readonly processMassiveIncreaseApplication: ProcessMassiveIncreaseApplication,
    @Inject(TransactionTypes.APPLICATION.CANCEL_MASSIVE_INCREASE)
    private readonly cancelMassiveIncreaseApplication: CancelMassiveIncreaseApplication,
    @Inject(TransactionTypes.APPLICATION.GET_ALL_MASSIVE_INCREASE)
    private readonly getAllMassiveIncreaseApplication: GetAllMassiveIncreaseApplication,
    @Inject(TransactionTypes.APPLICATION.GET_MASSIVE_INCREASE_BY_ID)
    private readonly getMassiveIncreaseByIdApplication: GetMassiveIncreaseByIdApplication,
    
    // TRANSACTION
    @Inject(TransactionTypes.APPLICATION.GET_ALL_TRANSACTIONS)
    private readonly getAllTransactionApplication: IGetAllTransactionApplication,
    @Inject(TransactionTypes.APPLICATION.GET_TRANSACTIONS_BY_ID)
    private readonly getTransactionByIdApplication: IGetTransactionByIdApplication,

    // TRANSACTION TYPE 
    @Inject(TransactionTypes.APPLICATION.CREATE_TRANSACTIONTYPES)
    private readonly createTransactionTypeApplication: ICreateTransactionTypeApplication
  ) { }

  // TRANSACTIONS
  @Get()
  findAll(@Request() req: RequestModel) {
    return this.getAllTransactionApplication.execute(req)
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestModel) {
    return this.getTransactionByIdApplication.execute(id, req)
  }

  // INIDIVIDUALS
  @Post('decrease/individual')
  createIndividualDecrease(@Body() createIndividualDto: CreateIndividualDto, @Request() request) {
    return this.individualDecreaseApplication.execute(createIndividualDto, request)
  }

  @Post('increase/individual')
  createIndividualIncrease(@Body() createIndividualDto: CreateIndividualDto, @Request() request) {
    return this.individualIncreaseApplication.execute(createIndividualDto, request);
  }

  // MASSIVES DECREASE
  @Post('decrease/massive')
  @UseInterceptors(
    FileInterceptor('excelFile', {
      limits: { fileSize: 3e7 },
      fileFilter: (req, file, callback) => {
        const mimetypeValid = {
          xls: 'application/vnd.ms-excel',
          xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        };
        if (file.mimetype !== mimetypeValid.xls && file.mimetype !== mimetypeValid.xlsx) {
          return callback(new BadRequestException('Invalid uploads: file format needs to be .xlsx or xls'), null);
        }
        return callback(null, true);
      },
    }),
  )

  async handlerMassiveDecrease(
    @UploadedFile() excelFile: Express.Multer.File,
    @Body() createMassiveDto: CreateMassiveDto,
    @Request() req: RequestModel,
  ) {
    const { action } = createMassiveDto;
    if (action === EMassiveAction.CREATE) return this.createMassiveDecreaseApplication.execute(excelFile, createMassiveDto, req);
    if (action === EMassiveAction.PROCESS) return this.processMassiveDecreaseApplication.execute(createMassiveDto, req);
    if (action === EMassiveAction.CANCEL) return this.cancelMassiveDecreaseApplication.execute(createMassiveDto);
  }

  @Get('decrease/massive')
  findAllMassiveDecrease(@Request() req) {
    return this.getAllMassiveDecreaseApplication.execute(req);
  }

  @Get('decrease/massive/:id')
  findOneMassiveDecrease(@Param('id') id: string, @Request() req) {
    return this.getMassiveDecreaseByIdApplication.execute(id, req);
  }

  // MASSIVES INCREASE
  @Post('increase/massive')
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
  async handlerMassiveIncrease(
    @UploadedFile() excelFile: Express.Multer.File,
    @Body() createMassiveDto: CreateMassiveDto,
    @Request() req: RequestModel,
  ) {
    const { action } = createMassiveDto;
    if (action === EMassiveAction.CREATE) return this.createMassiveIncreaseApplication.execute(excelFile, createMassiveDto, req);
    if (action === EMassiveAction.PROCESS) return this.processMassiveIncreaseApplication.execute(createMassiveDto, req);
    if (action === EMassiveAction.CANCEL) return this.cancelMassiveIncreaseApplication.execute(createMassiveDto);
  }

  @Get('increase/massive')
  findAllMassiveIncrease(@Request() req) {
    return this.getAllMassiveIncreaseApplication.execute(req);
  }

  @Get('increase/massive/:id')
  findOneMassiveIncrease(@Param('id') id: string, @Request() req) {
    return this.getMassiveIncreaseByIdApplication.execute(id, req);
  }

  // TRANSACTION_TYPES
  @Post('type')
  create(@Body() createTransactionTypeDto: CreateTransactionTypeDto) {
    return this.createTransactionTypeApplication.execute(createTransactionTypeDto)
  }

}