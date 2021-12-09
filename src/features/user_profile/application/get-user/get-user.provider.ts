;
import { UserProfileTypes } from '../../user.types';
import { GetUserApplication } from './get-user.application';

export const GetUserApplicationProvider = {
  provide: UserProfileTypes.APPLICATION.GET_USER,
  useClass: GetUserApplication,
};
