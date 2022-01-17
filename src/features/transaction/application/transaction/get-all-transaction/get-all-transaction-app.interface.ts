import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { Transaction } from 'src/features/transaction/domain/entities/transaction.entity';

export interface IGetAllTransactionApplication {
  execute(req: RequestModel): Promise<Transaction[]>;
}
