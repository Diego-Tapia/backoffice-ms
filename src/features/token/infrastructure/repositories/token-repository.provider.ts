import { TokenTypes } from '../../token.types';
import { TokenRepository } from './token.repository';

export const TokenRepositoryProvider = {
  provide: TokenTypes.INFRASTRUCTURE.REPOSITORY,
  useClass: TokenRepository,
};
