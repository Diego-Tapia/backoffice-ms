import { TransactionTypes } from 'src/features/transaction/transaction.types';
import { GetMassiveDecreaseByIdApplication } from './get-massive-decrease-by-id.application';

export const GetMassiveDecreaseByIdApplicationProvider = {
  provide: TransactionTypes.APPLICATION.GET_MASSIVE_DECREASE_BY_ID,
  useClass: GetMassiveDecreaseByIdApplication,
};
