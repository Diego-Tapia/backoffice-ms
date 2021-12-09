import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModel, ClientSchema } from '../client/infrastructure/models/client.model';
import { WalletModel, WalletSchema } from '../wallet/infrastructure/models/wallet.model';
import { GetAllWalletsByClientsApplicationProvider } from './application/get-all-walletsByClients/get-all-walletsByClients.provider';
import { GetWalletsByClientsByIdApplicationProvider } from './application/get-by-id-walletsByClients/get-by-id-walletsByClients.provider';
import {
  WalletsByClientsModel,
  WalletsByClientsSchema,
} from './infrastructure/model/walletByclients.model';
import { WalletsByClientsRepositoryProvider } from './infrastructure/repositories/walletsByClients-repository.provider';

@Module({
  controllers: [],
  imports: [
    MongooseModule.forFeature([
      { name: WalletsByClientsModel.name, schema: WalletsByClientsSchema },
      { name: WalletModel.name, schema: WalletSchema },
      { name: ClientModel.name, schema: ClientSchema },
    ]),
  ],
  providers: [
    WalletsByClientsRepositoryProvider,
    GetAllWalletsByClientsApplicationProvider,
    GetWalletsByClientsByIdApplicationProvider,
  ],
  exports: [WalletsByClientsRepositoryProvider],
})
export class WalletsByClientsFeatureModule {}
