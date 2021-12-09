import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MassiveDecreaseCotroller } from 'src/api/massive_decrease/massive-decrease.controller';
import { MassiveIncreaseFeatureModule } from '../massive_increase/massive-increase.module';
import { BlockchainModule } from '../shared/blockchain/infrastructure/service/blockchain.module';
import { LibrariesModule } from '../shared/libraries/libraries.module';
import { TransactionTypeFeatureModule } from '../transaction_type/transaction-type.module';
import { UserFeatureModule } from '../user/user.module';
import { UserProfileFeatureModule } from '../user_profile/user.module';
import { WalletsByClientsFeatureModule } from '../wallestByClients/walletsByClients.module';
import { WalletFeatureModule } from '../wallet/wallet.module';
import { CancelMassiveDecreaseApplicationProvider } from './application/cancel-massive-decrease/cancel-massive-decrease.provider';
import { CreateMassiveDecreaseApplicationProvider } from './application/create-massive-decrease/create-massive-decrease.provider';
import { ProcessMassiveDecreaseApplicationProvider } from './application/process-massive-decrease/process-massive-decrease.provider';
import { ValidateMassiveDecreaseApplicationProvider } from './application/validate-massive-decrease/validate-massive-decrease.provider';
import { MassiveDecreaseModel, MassiveDecreaseSchema } from './infrastructure/models/massive-decrease.model';
import { MassiveDecreaseRepositoryProvider } from './infrastructure/repositories/massive-decrease-repository.provider';

@Module({
  controllers: [MassiveDecreaseCotroller],
  imports: [
    LibrariesModule,
    WalletsByClientsFeatureModule,
    WalletFeatureModule,
    UserFeatureModule,
    UserProfileFeatureModule,
    TransactionTypeFeatureModule,
    BlockchainModule,
    forwardRef(() => MassiveIncreaseFeatureModule),
    MongooseModule.forFeature([
      { name: MassiveDecreaseModel.name, schema: MassiveDecreaseSchema},
    ]),
  ],
  providers: [
    CreateMassiveDecreaseApplicationProvider,
    ValidateMassiveDecreaseApplicationProvider,
    ProcessMassiveDecreaseApplicationProvider,
    CancelMassiveDecreaseApplicationProvider,
    MassiveDecreaseRepositoryProvider,
  ],
  exports: [
    MassiveDecreaseRepositoryProvider
  ]
})
export class MassiveDecreaseFeatureModule {}
