import { User } from '../../domain/entities/user.entity';
import { RequestModel } from 'src/features/admin/infrastructure/service/middleware/admin.middleware';

export interface IUserGetAllByClientIdApplication {
  execute(req: RequestModel): Promise<User[]>;
}
