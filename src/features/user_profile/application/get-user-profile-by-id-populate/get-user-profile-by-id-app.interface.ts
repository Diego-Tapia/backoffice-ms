import { UserProfile } from '../../domain/entities/userProfile.entity';

export interface IGetUserProfileByIdApplication {
  execute(id: string): Promise<UserProfile>;
}
