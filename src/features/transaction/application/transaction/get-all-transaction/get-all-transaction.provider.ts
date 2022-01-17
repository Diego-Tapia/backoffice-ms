import { TransactionTypes } from "src/features/transaction/transaction.types";
import { GetAllTransactionApplication } from "./get-all-transaction.application";

export const GetAllTransactionApplicationProvider = {
  provide: TransactionTypes.APPLICATION.GET_ALL_TRANSACTIONS,
  useClass: GetAllTransactionApplication,
};
