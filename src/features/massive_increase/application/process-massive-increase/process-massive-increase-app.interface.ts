import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { MassiveIncrease } from '../../domain/entities/massive-increase.entity';
import { MassiveIncreaseDto } from '../../infrastructure/dtos/massive-increase.dto';

export interface IProcessMassiveIncreaseApplication {
  execute(
    massiveIncreaseDto: MassiveIncreaseDto,
    req: RequestModel,
  ): Promise<MassiveIncrease>;
}
