import { Injectable, Inject } from '@nestjs/common';
import { TransactionType } from '../../domain/entities/transaction-type.entity';
import { CreateTransactionTypeDto } from '../../infrastructure/dtos/create-transaction-type.dto';
import { ITransactionTypeRepository } from '../../infrastructure/repositories/transaction-type/transaction-type-repository.interfase';
import { TransactionTypes } from '../../transaction.types';
import { ICreateTransactionTypeApplication } from './create-transaction-type-app.interface';

@Injectable()
export class CreateTransactionTypeApplication implements ICreateTransactionTypeApplication {
  constructor(
    @Inject(TransactionTypes.INFRASTRUCTURE.TRANSACTION_TYPE_REPOSITORY)
    private readonly transactionTypeRepository: ITransactionTypeRepository,
  ) {}

  public async execute(createTransactionTypeDto: CreateTransactionTypeDto): Promise<TransactionType> {
    const transactionType = new TransactionType({...createTransactionTypeDto})
    return this.transactionTypeRepository.create(transactionType)
  }
}
