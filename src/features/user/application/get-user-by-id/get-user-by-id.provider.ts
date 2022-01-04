import { UserTypes } from '../../user.types';
import { GetUserByIdApplication } from './get-user-by-id.application';

export const GetUserByIdApplicationProvider = {
  provide: UserTypes.APPLICATION.GET_USER_BY_ID,
  useClass: GetUserByIdApplication,
};
