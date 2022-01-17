import { TransactionTypes } from '../../transaction.types';
import { CreateTransactionTypeApplication } from './create-transaction-type.application';

export const CreateTransactionTypeApplicationProvider = {
  provide: TransactionTypes.APPLICATION.CREATE_TRANSACTIONTYPES,
  useClass: CreateTransactionTypeApplication,
};
