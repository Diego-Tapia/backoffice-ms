import { MassiveIncreaseTypes } from '../../massive-increase.types';
import { GetByIdMassiveIncreaseApplication } from './get-by-id-massive-increase.application';

export const GetByIdMassiveIncreaseApplicationProvider = {
  provide: MassiveIncreaseTypes.APPLICATION.GET_BY_ID_MASSIVE_INCREASE,
  useClass: GetByIdMassiveIncreaseApplication,
};

// export const GetAllMassiveIncreaseApplicationProvider = {
//   provide: MassiveIncreaseTypes.APPLICATION.GET_ALL_MASSIVE_INCREASE,
//   useClass: GetAllMassiveIncreaseApplication,
// };
