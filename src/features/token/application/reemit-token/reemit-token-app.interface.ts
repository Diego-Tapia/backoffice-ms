import { Transaction } from "src/features/transaction/domain/entities/transaction.entity";
import { ReemitTokenDto } from "../../infrastructure/dtos/reemit-token.dto";

export interface IReemitTokenApplication {
  execute(id: string, amount: ReemitTokenDto): Promise<Transaction>
}