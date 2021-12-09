import { TokenTypes } from '../../token.types';
import { CreateTokenApplication } from './create-token.application';

export const CreateTokenApplicationProvider = {
  provide: TokenTypes.APPLICATION.CREATE_TOKEN,
  useClass: CreateTokenApplication,
};
