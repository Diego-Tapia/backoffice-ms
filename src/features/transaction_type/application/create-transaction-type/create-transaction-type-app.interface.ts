import { TransactionType } from "../../domain/entities/transaction-type.entity";
import { CreateTransactionTypeDto } from "../../infrastructure/dtos/create-transaction-type.dto";

export interface ICreateTransactionTypeApplication {
  execute(createTransactionTypeDto: CreateTransactionTypeDto): Promise<TransactionType>;
}
