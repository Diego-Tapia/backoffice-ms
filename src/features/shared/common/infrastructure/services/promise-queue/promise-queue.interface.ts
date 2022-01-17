import { MutexInterface } from "async-mutex";

export interface IPromiseQueueService {
    run(mutex: MutexInterface, callback: (...args) => Promise<any>): Promise<any>;
    getInstance(): MutexInterface;
}