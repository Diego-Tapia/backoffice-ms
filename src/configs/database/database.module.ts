import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import configs from '../environments/configs';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof configs>) => {
        const { engine, name, host, port, user, pass } = configService.database;
        return {
          uri: `${engine}://${host}:${port}`,
          user,
          pass,
          dbName: name,
        };
      },
      inject: [configs.KEY],
    }),
  ],
})
export class DatabaseModule {}
