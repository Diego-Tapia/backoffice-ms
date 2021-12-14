import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MassiveIncreaseCotroller } from 'src/api/massive_increase/massive-increase.controller';
import { MassiveDecreaseFeatureModule } from '../massive_decrease/massive-decrease.module';
import { QueueEmitterFeatureModule } from '../queue_emitter/queue-emitter.module';
import { BlockchainModule } from '../shared/blockchain/infrastructure/service/blockchain.module';
import { LibrariesModule } from '../shared/libraries/libraries.module';
import { UserFeatureModule } from '../user/user.module';
import { UserProfileFeatureModule } from '../user_profile/user.module';
import { WalletsByClientsFeatureModule } from '../wallestByClients/walletsByClients.module';
import { WalletFeatureModule } from '../wallet/wallet.module';
import { CancelMassiveIncreaseApplicationProvider } from './application/cancel-massive-increase/cancel-massive-increase.provider';
import { CreateMassiveIncreaseApplicationProvider } from './application/create-massive-increase/create-massive-increase.provider';
import { ProcessMassiveIncreaseApplicationProvider } from './application/process-massive-increase/process-massive-increase.provider';
import { ValidateMassiveIncreaseApplicationProvider } from './application/validate-massive-increase/validate-massive-increase.provider';
import { MassiveIncreaseModel, MassiveIncreaseSchema } from './infrastructure/models/massive-increase.model';
import { MassiveIncreaseRepositoryProvider } from './infrastructure/repositories/massive-increase-repository.provider';

@Module({
  controllers: [MassiveIncreaseCotroller],
  imports: [
    LibrariesModule,
    WalletsByClientsFeatureModule,
    WalletFeatureModule,
    UserFeatureModule,
    UserProfileFeatureModule,
    BlockchainModule,
    QueueEmitterFeatureModule,
    forwardRef(() => MassiveDecreaseFeatureModule),
    MongooseModule.forFeature([
      { name: MassiveIncreaseModel.name, schema: MassiveIncreaseSchema },
    ]),
  ],
  providers: [
    CreateMassiveIncreaseApplicationProvider,
    ValidateMassiveIncreaseApplicationProvider,
    ProcessMassiveIncreaseApplicationProvider,
    CancelMassiveIncreaseApplicationProvider,
    MassiveIncreaseRepositoryProvider,
  ],
  exports: [
    MassiveIncreaseRepositoryProvider
  ]
})
export class MassiveIncreaseFeatureModule {}
