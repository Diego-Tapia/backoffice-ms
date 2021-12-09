
import { UserProfileTypes } from '../../user.types';
import { CreateUserApplication } from './create-user.application';

export const CreateUserApplicationProvider = {
  provide: UserProfileTypes.APPLICATION.CREATE_USER,
  useClass: CreateUserApplication,
};
