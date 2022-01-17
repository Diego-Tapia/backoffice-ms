import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import configs from 'src/configs/environments/configs';
import { ITransactionQueueMessage } from '../../../domain/interfaces/transaction-queue-message.interface';
import { ITransactionQueueEmitterApplication } from './transaction-queue-emitter-app.interface';
import { CommonTypes } from 'src/features/shared/common/common.types';
import { IMessageQueueService } from '../../../../shared/common/infrastructure/services/message-queue-service/message-queue-service.interface';

@Injectable()
export class TransactionQueueEmitterApplication implements ITransactionQueueEmitterApplication {
  constructor(
    @Inject(CommonTypes.INFRASTRUCTURE.MESSAGE_QUEUE_SERVICE)
    private readonly messageQueueService: IMessageQueueService,
    @Inject(configs.KEY)
    private readonly configService: ConfigType<typeof configs>,
  ) { }

  execute(message: ITransactionQueueMessage) {
    this.messageQueueService.sendMessage<ITransactionQueueMessage>(this.configService.sqs.url_t, message);
  }
}