import { Module } from '@nestjs/common';
import { IncrementController } from 'src/api/individual_increment/individual_increment.controller';
import { QueueEmitterFeatureModule } from '../queue_emitter/queue-emitter.module';
import { BlockchainModule } from '../shared/blockchain/infrastructure/service/blockchain.module';
import { UserFeatureModule } from '../user/user.module';
import { WalletsByClientsFeatureModule } from '../wallestByClients/walletsByClients.module';
import { WalletFeatureModule } from '../wallet/wallet.module';
import { IndividualIncrementApplicationProvider } from './application/individual-increment/individual-increment.provider';

@Module({
    controllers: [IncrementController],
    imports: [
        WalletFeatureModule,
        BlockchainModule,
        UserFeatureModule,
        WalletFeatureModule,
        WalletsByClientsFeatureModule,
        QueueEmitterFeatureModule,
    ],
    providers: [
        IndividualIncrementApplicationProvider,
    ]
})

export class IncrementFeatureModule { }