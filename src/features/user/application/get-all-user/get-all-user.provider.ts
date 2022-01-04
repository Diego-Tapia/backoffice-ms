import { UserTypes } from '../../user.types';
import { GetAllUserApplication } from './get-all-user.application';

export const GetAllUserApplicationProvider = {
  provide: UserTypes.APPLICATION.GET_ALL_USER,
  useClass: GetAllUserApplication,
};
