import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MassiveDecreaseCotroller } from 'src/api/massive_decrease/massive-decrease.controller';
import { MassiveIncreaseFeatureModule } from '../massive_increase/massive-increase.module';
import { QueueEmitterFeatureModule } from '../queue_emitter/queue-emitter.module';
import { BlockchainModule } from '../shared/blockchain/infrastructure/service/blockchain.module';
import { LibrariesModule } from '../shared/libraries/libraries.module';
import { UserFeatureModule } from '../user/user.module';
import { WalletsByClientsFeatureModule } from '../wallestByClients/walletsByClients.module';
import { WalletFeatureModule } from '../wallet/wallet.module';
import { CancelMassiveDecreaseApplicationProvider } from './application/cancel-massive-decrease/cancel-massive-decrease.provider';
import { CreateMassiveDecreaseApplicationProvider } from './application/create-massive-decrease/create-massive-decrease.provider';
import { GetAllMassiveDecreaseApplicationProvider } from './application/get-all-massive-decrease/get-all-massive-decrease.provider';
import { GetByIdMassiveDecreaseApplicationProvider } from './application/get-by-id-massive-decrease/get-by-id-massive-decrease.provider';
import { ProcessMassiveDecreaseApplicationProvider } from './application/process-massive-decrease/process-massive-decrease.provider';
import { ValidateMassiveDecreaseApplicationProvider } from './application/validate-massive-decrease/validate-massive-decrease.provider';
import {
  MassiveDecreaseModel,
  MassiveDecreaseSchema,
} from './infrastructure/models/massive-decrease.model';
import { MassiveDecreaseRepositoryProvider } from './infrastructure/repositories/massive-decrease-repository.provider';

@Module({
  controllers: [MassiveDecreaseCotroller],
  imports: [
    LibrariesModule,
    WalletsByClientsFeatureModule,
    WalletFeatureModule,
    UserFeatureModule,
    BlockchainModule,
    QueueEmitterFeatureModule,
    forwardRef(() => MassiveIncreaseFeatureModule),
    MongooseModule.forFeature([{ name: MassiveDecreaseModel.name, schema: MassiveDecreaseSchema }]),
  ],
  providers: [
    CreateMassiveDecreaseApplicationProvider,
    ValidateMassiveDecreaseApplicationProvider,
    ProcessMassiveDecreaseApplicationProvider,
    CancelMassiveDecreaseApplicationProvider,
    GetAllMassiveDecreaseApplicationProvider,
    GetByIdMassiveDecreaseApplicationProvider,
    MassiveDecreaseRepositoryProvider,
  ],
  exports: [MassiveDecreaseRepositoryProvider],
})
export class MassiveDecreaseFeatureModule {}
