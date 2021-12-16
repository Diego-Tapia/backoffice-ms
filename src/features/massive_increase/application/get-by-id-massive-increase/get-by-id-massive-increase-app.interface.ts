import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { MassiveIncrease } from '../../domain/entities/massive-increase.entity';

export interface IGetByIdMassiveIncreaseApp {
  execute(id: string): Promise<MassiveIncrease>;
}
