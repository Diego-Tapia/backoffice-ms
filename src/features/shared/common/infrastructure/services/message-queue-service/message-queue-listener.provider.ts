import { CommonTypes } from "../../../common.types";
import { MessageQueueService } from "./message-queue.service";

export const MessageQueueServiceProvider = {
  provide: CommonTypes.INFRASTRUCTURE.MESSAGE_QUEUE_SERVICE,
  useClass: MessageQueueService,
}