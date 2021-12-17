import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { MassiveDecrease } from '../../domain/entities/massive-decrease.entity';

export interface IGetByIdMassiveIncreaseApp {
  execute(req: RequestModel): Promise<MassiveDecrease>;
}
