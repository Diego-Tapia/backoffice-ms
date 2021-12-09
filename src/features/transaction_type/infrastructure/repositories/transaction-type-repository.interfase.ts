import { FilterQuery, UpdateQuery } from 'mongoose';
import { TransactionType } from '../../domain/entities/transaction-type.entity';
import { TransactionTypeModel } from '../models/transaction-type.model';

export interface ITransactionTypeRepository {
  create(transactionType: TransactionType): Promise<TransactionType>;
  findById(id: string): Promise<TransactionType>;
  findOne(filter: FilterQuery<TransactionTypeModel>): Promise<TransactionType>;
}