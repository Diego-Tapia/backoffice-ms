export interface IMessageQueueService {
    listenerMessage(QueueUrl: string, callback: Function): NodeJS.Timer;
    sendMessage<T>(QueueUrl: string, message: T): any;
}