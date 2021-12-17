import { UserProfileTypes } from '../../user.types';
import { GetUserProfileByIdApplication } from './get-user-profile-by-id.application';

export const GetUserProfileByIdApplicationProvider = {
  provide: UserProfileTypes.APPLICATION.GET_USER_PROFILE_BY_ID,
  useClass: GetUserProfileByIdApplication,
};
