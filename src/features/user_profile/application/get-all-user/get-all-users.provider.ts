;
import { UserProfileTypes } from '../../user.types';
import { GetAllUsersApplication } from './get-all-users.application';

export const GetAllUsersApplicationProvider = {
  provide: UserProfileTypes.APPLICATION.GET_ALL_USERS,
  useClass: GetAllUsersApplication,
};
