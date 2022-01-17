import { TransactionTypes } from "src/features/transaction/transaction.types";
import { MassiveDecreaseRepository } from "./massive-decrease.repository";

export const MassiveDecreaseRepositoryProvider = {
  provide: TransactionTypes.INFRASTRUCTURE.MASSIVE_DECREASE_REPOSITORY,
  useClass: MassiveDecreaseRepository,
};
