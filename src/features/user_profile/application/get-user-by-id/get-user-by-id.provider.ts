
import { UserProfileTypes } from '../../user.types';
import { GetUserByIdApplication } from './get-user-by-id.application';

export const GetUserByIdApplicationProvider = {
  provide: UserProfileTypes.APPLICATION.GET_USER_BY_ID,
  useClass: GetUserByIdApplication,
};
