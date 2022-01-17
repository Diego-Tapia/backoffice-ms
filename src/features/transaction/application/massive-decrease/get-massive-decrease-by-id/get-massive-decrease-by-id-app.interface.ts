import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { Massive } from 'src/features/transaction/domain/entities/massive.entity';

export interface IGetMassiveDecreaseByIdApplication {
  execute(id: string, req: RequestModel): Promise<Massive>;
}
