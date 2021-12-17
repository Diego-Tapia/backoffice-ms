import { MassiveDecreaseTypes } from '../../massive-decrease.types';
import { GetAllMassiveDecreaseApplication } from './get-all-massive-decrease.application';

export const GetAllMassiveDecreaseApplicationProvider = {
  provide: MassiveDecreaseTypes.APPLICATION.GET_ALL_MASSIVE_DECREASE,
  useClass: GetAllMassiveDecreaseApplication,
};
