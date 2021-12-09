import { TokenTypes } from '../../token.types';
import { GetAllTokensApplication } from './get-all-tokens.application';

export const GetAllTokensApplicationProvider = {
  provide: TokenTypes.APPLICATION.GET_ALL_TOKENS,
  useClass: GetAllTokensApplication,
};
