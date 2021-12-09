import { Applicabilities } from '../../domain/entities/applicabilities.entity';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';

export interface IGetAllApplicabilitiesApp {
  execute(req: RequestModel): Promise<Applicabilities[]>;
}
