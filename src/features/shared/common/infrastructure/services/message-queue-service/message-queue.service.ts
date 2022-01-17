import { Inject, Injectable, Logger } from '@nestjs/common';
import configs from 'src/configs/environments/configs';
import { ConfigType } from '@nestjs/config';

import { DeleteMessageCommand, Message, ReceiveMessageCommand, SendMessageCommand, SendMessageCommandInput, SQSClient } from '@aws-sdk/client-sqs';
import { IMessageQueueService } from './message-queue-service.interface';

@Injectable()
export class MessageQueueService implements IMessageQueueService {
  private readonly sqsClient: SQSClient;

  constructor(
    @Inject(configs.KEY)
    private readonly configService: ConfigType<typeof configs>,
  ) {
    const config = {
      endpoint: this.configService.app.env === 'localhost' ? this.configService.sqs.sqs_endpoint_url : undefined,
      region: this.configService.sqs.region,
      credentials: {
        accessKeyId: this.configService.sqs.accesKeyId,
        secretAccessKey: this.configService.sqs.secretAccessKey,
      }
    };

    this.sqsClient = new SQSClient(config);
  }

  public listenerMessage(queueURL: string, callback: Function) {

    const recieveMessage = async () => {
      try {
        const data = await this.receiveMessage(queueURL);
        if (!data.Messages) return;

        const [sqsMessage] = data.Messages;//primer indice del array
        const message = JSON.parse(sqsMessage.Body);

        console.log('message: ', message);

        await callback(message);
        await this.deleteMessage(queueURL, sqsMessage);
      } catch (err) {
        Logger.error("Receive Error", [JSON.stringify(err)]);
      }
    };

    return setInterval(async () => {
      await recieveMessage();
    }, 1000);
  }

  public sendMessage<T>(QueueUrl: string, message: T) {
    const params: SendMessageCommandInput = {
      MessageBody: JSON.stringify(message),
      QueueUrl,
    };
    this.sqsClient.send(new SendMessageCommand(params));
  }

  
  private async deleteMessage(queueURL: string, sqsMessage: Message) {
    try {
      const deleteParams = {
        QueueUrl: queueURL,
        ReceiptHandle: sqsMessage.ReceiptHandle,
      };
      const data = await this.sqsClient.send(new DeleteMessageCommand(deleteParams));
      Logger.log("Message deleted: ", [JSON.stringify(data)]);
    } catch (err) {
      Logger.error("Error", [JSON.stringify(err)]);
    }
  }

  private async receiveMessage(queueURL: string) {
    return await this.sqsClient.send(new ReceiveMessageCommand({
      AttributeNames: ["SentTimestamp"],
      MaxNumberOfMessages: 1,
      MessageAttributeNames: ["All"],
      QueueUrl: queueURL,
      //VisibilityTimeout: 20,
      WaitTimeSeconds: 0,
    }));
  }
}

