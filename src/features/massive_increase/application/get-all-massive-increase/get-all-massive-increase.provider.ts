import { MassiveIncreaseTypes } from '../../massive-increase.types';
import { GetAllMassiveIncreaseApplication } from './get-all-massive-increase.application';

export const GetAllMassiveIncreaseApplicationProvider = {
  provide: MassiveIncreaseTypes.APPLICATION.GET_ALL_MASSIVE_INCREASE,
  useClass: GetAllMassiveIncreaseApplication,
};
