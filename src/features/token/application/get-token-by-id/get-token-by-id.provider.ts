import { TokenTypes } from '../../token.types';
import { GetTokenByIdApplication } from './get-token-by-id.application';

export const GetTokenByIdApplicationProvider = {
  provide: TokenTypes.APPLICATION.GET_TOKEN_BY_ID,
  useClass: GetTokenByIdApplication,
};
