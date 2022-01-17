import { FilterQuery, PopulateOptions } from "mongoose";
import { Transaction } from "src/features/transaction/domain/entities/transaction.entity";
import { TransactionModel } from "../../models/transaction.model";

export interface ITransactionRepository {
  findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<Transaction>;
  findOne(filter: FilterQuery<TransactionModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Transaction>
  findAll(filter?: FilterQuery<TransactionModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Transaction[]>;
}
