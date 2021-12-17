import { UserProfileTypes } from '../../user.types';
import { GetAllUserProfileByClientIdApplication } from './get-all-user-profile-by-client-id.application';

export const GetAllUserProfileByClientIdApplicationProvider = {
  provide: UserProfileTypes.APPLICATION.GET_ALL_USER_PROFILE_BY_CLIENT_ID,
  useClass: GetAllUserProfileByClientIdApplication,
};
