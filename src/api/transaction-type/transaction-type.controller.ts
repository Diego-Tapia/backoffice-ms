import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ICreateTransactionTypeApplication } from 'src/features/transaction_type/application/create-transaction-type/create-transaction-type-app.interface';
import { CreateTransactionTypeDto } from 'src/features/transaction_type/infrastructure/dtos/create-transaction-type.dto';
import { TransactionTypeTypes } from 'src/features/transaction_type/transaction-type.types';

@ApiTags('transaction-type')
@Controller('transaction-type')
export class TransactionTypeController {
  
  constructor(
    @Inject(TransactionTypeTypes.APPLICATION.CREATE_TRANSACTIONTYPES)
    private readonly createTransactionTypeApplication: ICreateTransactionTypeApplication
  ) {}

  @Post()
  create(@Body() createTransactionTypeDto: CreateTransactionTypeDto) {
    return this.createTransactionTypeApplication.execute(createTransactionTypeDto)
  }
}
