import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { MassiveIncrease } from '../../domain/entities/massive-increase.entity';
import { MassiveIncreaseDto } from '../../infrastructure/dtos/massive-increase.dto';

export interface IValidateMassiveIncreaseApplication {
  execute(massiveIncrease: MassiveIncrease, req: RequestModel): Promise<MassiveIncrease>;
}
