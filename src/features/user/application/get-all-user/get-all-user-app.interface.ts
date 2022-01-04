import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { UserProfile } from '../../domain/entities/user-profile.entity';

export interface IGetAllUserApplication {
  execute(req: RequestModel): Promise<UserProfile[]>;
}
