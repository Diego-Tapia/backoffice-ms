import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { UserProfile } from '../../domain/entities/user-profile.entity';

export interface IGetUserByIdApplication {
  execute(id: string, request: RequestModel): Promise<UserProfile>;
}
