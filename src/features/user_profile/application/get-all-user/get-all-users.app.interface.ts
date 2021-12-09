import { UserProfile } from '../../domain/entities/userProfile.entity';

export interface IGetAllUsersApplication {
  execute(): Promise<UserProfile[]>;
}
