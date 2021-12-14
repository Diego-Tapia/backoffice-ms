import { QueueEmitterTypes } from "../../queue-emitter.types";
import { QueueEmitterTransactionApplication } from "./queue-emitter-transaction.application";

export const QueueEmitterTransactionApplicationProvider = {
  provide: QueueEmitterTypes.APPLICATION.EMITTER_TRANSACTION,
  useClass: QueueEmitterTransactionApplication,
};