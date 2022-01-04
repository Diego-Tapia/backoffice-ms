import { UserTypes } from 'src/features/user/user.types';
import { UserProfileRepository } from './user-profile.repository';

export const UserProfileRepositoryProvider = {
  provide: UserTypes.INFRASTRUCTURE.USER_PROFILE_REPOSITORY,
  useClass: UserProfileRepository,
};
