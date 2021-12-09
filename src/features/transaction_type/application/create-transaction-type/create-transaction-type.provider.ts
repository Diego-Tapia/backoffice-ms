import { TransactionTypeTypes } from '../../transaction-type.types';
import { CreateTransactionTypeApplication } from './create-transaction-type.application';

export const CreateTransactionTypeApplicationProvider = {
  provide: TransactionTypeTypes.APPLICATION.CREATE_TRANSACTIONTYPES,
  useClass: CreateTransactionTypeApplication,
};
