import { QueueEmitterTypes } from "src/features/queue_emitter/queue-emitter.types";
import { SqsEmitterService } from "./sqs-emitter.service";

export const SqsEmitterServiceProvider = {
  provide: QueueEmitterTypes.INFRASTRUCTURE.SQS_EMITTER_SERVICE,
  useClass: SqsEmitterService,
}