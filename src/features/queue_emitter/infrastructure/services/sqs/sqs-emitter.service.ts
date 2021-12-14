import { Inject, Injectable } from '@nestjs/common';
import { SendMessageCommand, SendMessageCommandInput, SQSClient, SQSClientConfig } from '@aws-sdk/client-sqs';
import configs from 'src/configs/environments/configs';
import { ConfigType } from '@nestjs/config';
import { ISqsEmitterService } from './sqs-emitter-service.interface';

@Injectable()
export class SqsEmitterService implements ISqsEmitterService {
  private sqsClient: SQSClient;

  constructor(
    @Inject(configs.KEY)
    private readonly configService: ConfigType<typeof configs>,
  ) {
    const config: SQSClientConfig = {
      endpoint: this.configService.sqs.sqs_endpoint_url,
      region: process.env.REGION,
      credentials: {
        accessKeyId: this.configService.sqs.accesKeyId,
        secretAccessKey: this.configService.sqs.secretAccessKey,
      },
    };
    this.sqsClient = new SQSClient(config);
  }

  public sendMessage<T>(QueueUrl: string, message: T) {
    const params: SendMessageCommandInput = {
      MessageBody: JSON.stringify(message),
      QueueUrl,
    };
    this.sqsClient.send(new SendMessageCommand(params));
  }
}
