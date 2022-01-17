import { TransactionTypes } from "src/features/transaction/transaction.types";
import { MassiveIncreaseRepository } from "./massive-increase.repository";

export const MassiveIncreaseRepositoryProvider = {
  provide: TransactionTypes.INFRASTRUCTURE.MASSIVE_INCREASE_REPOSITORY,
  useClass: MassiveIncreaseRepository,
};
