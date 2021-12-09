import { TransactionTypeTypes } from "../../transaction-type.types";
import { TransactionTypeRepository } from "./transaction-type.repository";

export const TransactionTypeRepositoryProvider = {
  provide: TransactionTypeTypes.INFRASTRUCTURE.REPOSITORY,
  useClass: TransactionTypeRepository,
};
