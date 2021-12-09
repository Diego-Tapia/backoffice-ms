import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletController } from 'src/api/wallet/wallet.controller';
import { BlockchainModule } from '../shared/blockchain/infrastructure/service/blockchain.module';
import { GetBalancesApplicationProvider } from './application/get-all-balances/get-balances.provider';
import { WalletModel, WalletSchema } from './infrastructure/models/wallet.model';
import { WalletRepositoryProvider } from './infrastructure/repositories/wallet-repository.provider';

@Module({
  controllers: [WalletController],
  imports: [
    BlockchainModule,
    MongooseModule.forFeature([{ name: WalletModel.name, schema: WalletSchema }])],
  providers: [WalletRepositoryProvider, GetBalancesApplicationProvider],
  exports: [WalletRepositoryProvider, GetBalancesApplicationProvider],
})
export class WalletFeatureModule {}
