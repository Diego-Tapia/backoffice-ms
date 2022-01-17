import { TokenTypes } from '../../token.types';
import { GetTokenApplication } from './get-token.application';

export const GetTokenApplicationProvider = {
  provide: TokenTypes.APPLICATION.GET_TOKEN,
  useClass: GetTokenApplication,
};
