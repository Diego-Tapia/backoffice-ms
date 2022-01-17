import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModel, ClientSchema } from './infrastructure/models/client.model';
import { ClientRepositoryProvider } from './infrastructure/repositories/client-repository.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClientModel.name, schema: ClientSchema }
    ]),
  ],
  providers: [ClientRepositoryProvider],
  exports: [ClientRepositoryProvider],
})
export class ClientFeatureModule {}
