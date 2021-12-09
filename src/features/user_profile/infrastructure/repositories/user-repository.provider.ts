import { UserProfileTypes } from '../../user.types';
import { UserRepository } from './user.repository';

export const UserProfileRepositoryProvider = {
  provide: UserProfileTypes.INFRASTRUCTURE.REPOSITORY,
  useClass: UserRepository,
};
