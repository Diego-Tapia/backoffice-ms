import { TransactionTypes } from 'src/features/transaction/transaction.types';
import { GetAllMassiveIncreaseApplication } from './get-all-massive-increase.application';

export const GetAllMassiveIncreaseApplicationProvider = {
  provide: TransactionTypes.APPLICATION.GET_ALL_MASSIVE_INCREASE,
  useClass: GetAllMassiveIncreaseApplication,
};
