import { Transaction } from "src/features/transaction/domain/entities/transaction.entity";

export interface IEmitTokenApplication {
  execute(id: string): Promise<Transaction>
}