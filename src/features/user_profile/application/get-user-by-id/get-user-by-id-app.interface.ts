import { UserProfile } from '../../domain/entities/userProfile.entity';

export interface IGetUserByIdApplication {
  execute(id: string): Promise<UserProfile>;
}
