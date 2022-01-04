import { UserTypes } from '../../user.types';
import { ValidateUserApplication } from './validate-user.application';

export const ValidateUserApplicationProvider = {
  provide: UserTypes.APPLICATION.VALIDATE_USER,
  useClass: ValidateUserApplication,
};
