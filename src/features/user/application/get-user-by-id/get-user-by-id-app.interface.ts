import { UserProfile } from '../../domain/entities/user-profile.entity';

export interface IGetUserByIdApplication {
  execute(id: string): Promise<UserProfile>;
}
