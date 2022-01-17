import { ITransactionQueueMessage } from "../../../domain/interfaces/transaction-queue-message.interface";

export interface ITransactionQueueEmitterApplication {
  execute(message: ITransactionQueueMessage): void
}
