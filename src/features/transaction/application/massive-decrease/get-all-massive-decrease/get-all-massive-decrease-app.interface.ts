import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { Massive } from 'src/features/transaction/domain/entities/massive.entity';

export interface IGetAllMassiveDecreaseApp {
  execute(req: RequestModel): Promise<Massive[]>;
}
