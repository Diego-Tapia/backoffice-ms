
import { UserProfileTypes } from '../../user.types';
import { ValidateUserApplication } from './validate-user.application';

export const ValidateUserApplicationProvider = {
  provide: UserProfileTypes.APPLICATION.VALIDATE_USER,
  useClass: ValidateUserApplication,
};
