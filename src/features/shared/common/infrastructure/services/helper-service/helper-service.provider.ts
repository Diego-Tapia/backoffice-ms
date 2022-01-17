import { CommonTypes } from '../../../common.types';
import { HelperService } from './helper.service';

export const HelperServiceProvider = {
  provide: CommonTypes.INFRASTRUCTURE.HELPER_SERVICE,
  useClass: HelperService,
};