import { UserTypes } from '../../user.types';
import { UsersGetAllByClientIdApplication } from './user-get-all-by-client-id.application';

export const UserGetAllByClientIdProvider = {
  provide: UserTypes.APPLICATION.USER_GET_ALL_BY_CLIENT_ID,
  useClass: UsersGetAllByClientIdApplication,
};
