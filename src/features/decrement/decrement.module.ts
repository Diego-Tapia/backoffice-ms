import { Module } from '@nestjs/common';
import { DecrementController } from 'src/api/decrement/decrement.controller';
import { BlockchainModule } from '../shared/blockchain/infrastructure/service/blockchain.module';
import { UserFeatureModule } from '../user/user.module';
import { WalletsByClientsFeatureModule } from '../wallestByClients/walletsByClients.module';
import { WalletFeatureModule } from '../wallet/wallet.module';
import { IndividualDecrementApplicationProvider } from './application/individual-decrement/individual-decrement.provider';

@Module({
    controllers: [DecrementController],
    imports: [
        WalletFeatureModule,
        BlockchainModule,
        UserFeatureModule,
        WalletFeatureModule,
        WalletsByClientsFeatureModule
    ],
    providers: [
        IndividualDecrementApplicationProvider
    ]
})

export class DecrementFeatureModule {}