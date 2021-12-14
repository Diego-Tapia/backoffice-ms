import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import configs from 'src/configs/environments/configs';
import { ITransactionQueueMessage } from '../../domain/interfaces/transaction-queue-message.interface';
import { ISqsEmitterService } from '../../infrastructure/services/sqs/sqs-emitter-service.interface';
import { QueueEmitterTypes } from '../../queue-emitter.types';
import { IQueueEmitterTransactionApplication } from './queue-emitter-transaction-app.interface';

export class QueueEmitterTransactionApplication implements IQueueEmitterTransactionApplication {
  constructor(
    @Inject(QueueEmitterTypes.INFRASTRUCTURE.SQS_EMITTER_SERVICE)
    private readonly sqsEmitterService: ISqsEmitterService,
    @Inject(configs.KEY)
    private readonly configService: ConfigType<typeof configs>,
  ) { }

  execute(message: ITransactionQueueMessage) {
    this.sqsEmitterService.sendMessage<ITransactionQueueMessage>(this.configService.sqs.url_t, message);
  }
}