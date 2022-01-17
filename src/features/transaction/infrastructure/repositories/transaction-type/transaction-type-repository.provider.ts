import { TransactionTypes } from "src/features/transaction/transaction.types";
import { TransactionTypeRepository } from "./transaction-type.repository";

export const TransactionTypeRepositoryProvider = {
  provide: TransactionTypes.INFRASTRUCTURE.TRANSACTION_TYPE_REPOSITORY,
  useClass: TransactionTypeRepository,
};
