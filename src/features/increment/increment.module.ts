import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IncrementController } from 'src/api/increment/increment.controller';
import { BlockchainModule } from '../shared/blockchain/infrastructure/service/blockchain.module';
import { TransactionModel, TransactionSchema } from '../transaction/infrastructure/models/transaction.model';
import { UserFeatureModule } from '../user/user.module';
import { WalletsByClientsFeatureModule } from '../wallestByClients/walletsByClients.module';
import { WalletFeatureModule } from '../wallet/wallet.module';
import { GetAllIndividualIncrementApplicationProvider } from './application/get-all-individual-increments/get-all-individual-increment.provider';
import { IndividualIncrementApplicationProvider } from './application/individual-increment/individual-increment.provider';
import { IncrementRepositoryProvider } from './infrastructure/repositories/increment-repository.provider';

@Module({
    controllers: [IncrementController],
    imports: [
        WalletFeatureModule,
        BlockchainModule,
        UserFeatureModule,
        WalletFeatureModule,
        WalletsByClientsFeatureModule,
        MongooseModule.forFeature([{ name: TransactionModel.name, schema: TransactionSchema }]),
    ],
    providers: [
        IndividualIncrementApplicationProvider,
        GetAllIndividualIncrementApplicationProvider,
        IncrementRepositoryProvider
    ]
})

export class IncrementFeatureModule {}