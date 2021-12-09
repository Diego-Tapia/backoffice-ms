import { TokenTypes } from '../../token.types';
import { UpdateTokenApplication } from './update-token.appilcation';

export const UpdateTokenApplicationProvider = {
  provide: TokenTypes.APPLICATION.UPDATE_TOKEN,
  useClass: UpdateTokenApplication
}