import { Transaction } from "src/features/transaction/domain/entities/transaction.entity";

export interface IIncrementRepository {
  findAll(): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction>;
}
