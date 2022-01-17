import { TransactionTypes } from "src/features/transaction/transaction.types";
import { TransactionRepository } from "./transaction.repository";

export const TransactionRepositoryProvider = {
  provide: TransactionTypes.INFRASTRUCTURE.TRANSACTION_REPOSITORY,
  useClass: TransactionRepository,
};
