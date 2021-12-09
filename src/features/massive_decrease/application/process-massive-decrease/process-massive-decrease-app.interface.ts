import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { MassiveDecrease } from '../../domain/entities/massive-decrease.entity';
import { MassiveDecreaseDto } from '../../infrastructure/dtos/massive-decrease.dto';

export interface IProcessMassiveDecreaseApplication {
  execute(massiveDecreaseDto: MassiveDecreaseDto, req: RequestModel): Promise<MassiveDecrease>;
}
