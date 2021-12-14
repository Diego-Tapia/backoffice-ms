import { Module } from '@nestjs/common';
import { QueueEmitterTransactionApplicationProvider } from './application/transaction/queue-emitter-transaction.provider';
import { SqsEmitterServiceProvider } from './infrastructure/services/sqs/sqs-emitter.provider';

@Module({
  providers: [
    QueueEmitterTransactionApplicationProvider,
    SqsEmitterServiceProvider,
  ],
  exports: [
    QueueEmitterTransactionApplicationProvider
  ],
})
export class QueueEmitterFeatureModule {}
