import { RequestModel } from "src/features/admin/infrastructure/service/middleware/admin.middleware";
import { Transaction } from "src/features/transaction/domain/entities/transaction.entity";
import { ReemitTokenDto } from "../../infrastructure/dtos/reemit-token.dto";

export interface IReemitTokenApplication {
  execute(id: string, amount: ReemitTokenDto, request: RequestModel): Promise<void>
}