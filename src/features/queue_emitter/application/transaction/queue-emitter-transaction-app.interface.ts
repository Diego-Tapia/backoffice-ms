import { ITransactionQueueMessage } from "../../domain/interfaces/transaction-queue-message.interface";

export interface IQueueEmitterTransactionApplication {
  execute(message: ITransactionQueueMessage): void
}
