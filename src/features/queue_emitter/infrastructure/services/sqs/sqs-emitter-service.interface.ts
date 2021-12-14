export interface ISqsEmitterService {
    sendMessage<T>(QueueUrl: string, message: T): any;
}