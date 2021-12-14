import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import configs from '../environments/configs';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof configs>) => {
        return {
          uri: configService.database.uri,
        };
      },
      inject: [configs.KEY],
    }),
  ],
})
export class DatabaseModule {}
