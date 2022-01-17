import { TransactionTypes } from "src/features/transaction/transaction.types";
import { TransactionQueueEmitterApplication } from "./transaction-queue-emitter.application";

export const TransactionQueueEmitterApplicationProvider = {
  provide: TransactionTypes.APPLICATION.TRANSACTION_EMMITER,
  useClass: TransactionQueueEmitterApplication,
};