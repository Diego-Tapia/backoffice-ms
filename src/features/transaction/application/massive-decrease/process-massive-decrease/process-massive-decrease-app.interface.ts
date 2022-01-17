import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { Massive } from 'src/features/transaction/domain/entities/massive.entity';
import { CreateMassiveDto } from 'src/features/transaction/infrastructure/dtos/create-massive.dto';

export interface IProcessMassiveDecreaseApplication {
  execute(massiveDecreaseDto: CreateMassiveDto, req: RequestModel): Promise<Massive>;
}
