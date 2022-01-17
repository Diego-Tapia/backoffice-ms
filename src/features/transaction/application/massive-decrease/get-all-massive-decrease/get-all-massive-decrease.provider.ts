import { TransactionTypes } from 'src/features/transaction/transaction.types';
import { GetAllMassiveDecreaseApplication } from './get-all-massive-decrease.application';

export const GetAllMassiveDecreaseApplicationProvider = {
  provide: TransactionTypes.APPLICATION.GET_ALL_MASSIVE_DECREASE,
  useClass: GetAllMassiveDecreaseApplication,
};
