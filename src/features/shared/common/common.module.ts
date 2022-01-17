import { Global, Module } from '@nestjs/common';
import { HelperServiceProvider } from './infrastructure/services/helper-service/helper-service.provider';
import { MessageQueueServiceProvider } from './infrastructure/services/message-queue-service/message-queue-listener.provider';
import { PromiseQueueServiceProvider } from './infrastructure/services/promise-queue/promise-queue.provider';

@Global()
@Module({
  providers: [
    HelperServiceProvider, 
    MessageQueueServiceProvider,
    PromiseQueueServiceProvider
  ],
  exports: [
    HelperServiceProvider, 
    MessageQueueServiceProvider,
    PromiseQueueServiceProvider
  ]
})
export class CommonFeatureModule { }
