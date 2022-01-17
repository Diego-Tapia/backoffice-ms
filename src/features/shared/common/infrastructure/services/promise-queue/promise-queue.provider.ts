import { CommonTypes } from "../../../common.types";
import { PromiseQueueService } from "./promise-queue.service";

export const PromiseQueueServiceProvider = {
  provide: CommonTypes.INFRASTRUCTURE.PROMISE_QUEUE_SERVICE,
  useClass: PromiseQueueService
};
