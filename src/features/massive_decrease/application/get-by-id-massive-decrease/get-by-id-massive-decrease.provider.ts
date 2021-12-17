import { MassiveDecreaseTypes } from '../../massive-decrease.types';
import { GetByIdMassiveDecreaseApplication } from './get-by-id-massive-decrease.application';

export const GetByIdMassiveDecreaseApplicationProvider = {
  provide: MassiveDecreaseTypes.APPLICATION.GET_BY_ID_MASSIVE_DECREASE,
  useClass: GetByIdMassiveDecreaseApplication,
};
