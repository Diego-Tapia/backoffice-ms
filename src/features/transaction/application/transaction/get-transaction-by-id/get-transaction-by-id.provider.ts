import { TransactionTypes } from 'src/features/transaction/transaction.types';
import { GetTransactionByIdApplication } from './get-transaction-by-id.application';

export const GetTransactionByIdApplicationProvider = {
  provide: TransactionTypes.APPLICATION.GET_TRANSACTIONS_BY_ID,
  useClass: GetTransactionByIdApplication,
};
