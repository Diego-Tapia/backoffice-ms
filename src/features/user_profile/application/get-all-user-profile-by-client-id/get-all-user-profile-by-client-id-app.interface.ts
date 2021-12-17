import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { UserProfile } from '../../domain/entities/userProfile.entity';

export interface IGetAllUserProfileByClientIdApplication {
  execute(req: RequestModel): Promise<UserProfile[]>;
}
