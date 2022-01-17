import { Injectable } from '@nestjs/common';
import { Mutex, MutexInterface } from 'async-mutex';
import { IPromiseQueueService } from './promise-queue.interface';

@Injectable()
export class PromiseQueueService implements IPromiseQueueService {
  async run(mutex: MutexInterface, callback: (...args) => Promise<any>) {
    
    if (!mutex) throw new Error('No existe una instancia de Mutex')
    return await mutex.runExclusive(callback);
  }

  getInstance() {
    return new Mutex();
  }
}
