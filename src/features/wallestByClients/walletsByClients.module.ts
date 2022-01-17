import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GetAllWalletsByClientsApplicationProvider } from './application/get-all-walletsByClients/get-all-walletsByClients.provider';
import { GetWalletsByClientsByIdApplicationProvider } from './application/get-walletsByClients-by-id/get-walletsByClients-by-id.provider';
import { WalletsByClientsModel,WalletsByClientsSchema } from './infrastructure/model/walletsByclients.model';
import { WalletsByClientsRepositoryProvider } from './infrastructure/repositories/walletsByClients-repository.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WalletsByClientsModel.name, schema: WalletsByClientsSchema },
    ]),
  ],
  providers: [
    WalletsByClientsRepositoryProvider,
    GetAllWalletsByClientsApplicationProvider,
    GetWalletsByClientsByIdApplicationProvider,
  ],
  exports: [
    WalletsByClientsRepositoryProvider
  ],
})
export class WalletsByClientsFeatureModule {}
