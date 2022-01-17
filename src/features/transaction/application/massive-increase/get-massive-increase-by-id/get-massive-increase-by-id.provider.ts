import { TransactionTypes } from 'src/features/transaction/transaction.types';
import { GetMassiveIncreaseByIdApplication } from './get-massive-increase-by-id.application';

export const GetMassiveIncreaseByIdApplicationProvider = {
  provide: TransactionTypes.APPLICATION.GET_MASSIVE_INCREASE_BY_ID,
  useClass: GetMassiveIncreaseByIdApplication,
};
