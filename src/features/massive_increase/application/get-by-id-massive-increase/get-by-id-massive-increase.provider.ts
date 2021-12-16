import { MassiveIncreaseTypes } from '../../massive-increase.types';
import { GetByIdMassiveIncreaseApplication } from './get-by-id-massive-increase.application';

export const GetByIdMassiveIncreaseApplicationProvider = {
  provide: MassiveIncreaseTypes.APPLICATION.GET_BY_ID_MASSIVE_INCREASE,
  useClass: GetByIdMassiveIncreaseApplication,
};