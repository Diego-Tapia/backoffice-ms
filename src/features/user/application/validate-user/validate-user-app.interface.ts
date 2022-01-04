import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';
import { UserProfile } from '../../domain/entities/user-profile.entity';

export interface IValidateUserApplication {
  execute(userIdentifier: string, request: RequestModel): Promise<UserProfile>;
}
