import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionController } from 'src/api/transaction/transaction.controller';
import { ClientFeatureModule } from '../client/client.module';
import { BlockchainModule } from '../shared/blockchain/infrastructure/service/blockchain.module';
import { CommonFeatureModule } from '../shared/common/common.module';
import { LibrariesModule } from '../shared/libraries/libraries.module';
import { TokenFeatureModule } from '../token/token.module';
import { UserFeatureModule } from '../user/user.module';
import { WalletsByClientsFeatureModule } from '../wallestByClients/walletsByclients.module';
import { WalletFeatureModule } from '../wallet/wallet.module';
import { CreateTransactionTypeApplicationProvider } from './application/create-transaction-type/create-transaction-type.provider';
import { IndividualDecreaseApplicationProvider } from './application/individual-decrease/individual-decrease.provider';
import { IndividualIncreaseApplicationProvider } from './application/individual-increase/individual-increase.provider';
import { CancelMassiveDecreaseApplicationProvider } from './application/massive-decrease/cancel-massive-decrease/cancel-massive-decrease.provider';
import { CreateMassiveDecreaseApplicationProvider } from './application/massive-decrease/create-massive-decrease/create-massive-decrease.provider';
import { GetAllMassiveDecreaseApplicationProvider } from './application/massive-decrease/get-all-massive-decrease/get-all-massive-decrease.provider';
import { GetMassiveDecreaseByIdApplicationProvider } from './application/massive-decrease/get-massive-decrease-by-id/get-massive-decrease-by-id.provider';
import { ProcessMassiveDecreaseApplicationProvider } from './application/massive-decrease/process-massive-decrease/process-massive-decrease.provider';
import { ValidateMassiveDecreaseApplicationProvider } from './application/massive-decrease/validate-massive-decrease/validate-massive-decrease.provider';
import { CancelMassiveIncreaseApplicationProvider } from './application/massive-increase/cancel-massive-increase/cancel-massive-increase.provider';
import { CreateMassiveIncreaseApplicationProvider } from './application/massive-increase/create-massive-increase/create-massive-increase.provider';
import { GetAllMassiveIncreaseApplicationProvider } from './application/massive-increase/get-all-massive-increase/get-all-massive-increase.provider';
import { GetMassiveIncreaseByIdApplicationProvider } from './application/massive-increase/get-massive-increase-by-id/get-massive-increase-by-id.provider';
import { ProcessMassiveIncreaseApplicationProvider } from './application/massive-increase/process-massive-increase/process-massive-increase.provider';
import { ValidateMassiveIncreaseApplicationProvider } from './application/massive-increase/validate-massive-increase/validate-massive-increase.provider';
import { GetAllTransactionApplicationProvider } from './application/transaction/get-all-transaction/get-all-transaction.provider';
import { GetTransactionByIdApplicationProvider } from './application/transaction/get-transaction-by-id/get-transaction-by-id.provider';
import { TransactionQueueEmitterApplicationProvider } from './application/transaction/transaction-queue-emmiter/transaction-queue-emitter.provider';
import { MassiveDecreaseModel, MassiveDecreaseSchema } from './infrastructure/models/massive-decrease.model';
import { MassiveIncreaseModel, MassiveIncreaseSchema } from './infrastructure/models/massive-increase.model';
import { TransactionTypeModel, TransactionTypeSchema } from './infrastructure/models/transaction-type.model';
import { TransactionModel, TransactionSchema } from './infrastructure/models/transaction.model';
import { MassiveDecreaseRepositoryProvider } from './infrastructure/repositories/massive-decrease/massive-decrease-repository.provider';
import { MassiveIncreaseRepositoryProvider } from './infrastructure/repositories/massive-increase/massive-increase-repository.provider';
import { TransactionTypeRepositoryProvider } from './infrastructure/repositories/transaction-type/transaction-type-repository.provider';
import { TransactionRepositoryProvider } from './infrastructure/repositories/transaction/transaction-repository.provider';

@Module({
  controllers: [
    TransactionController
  ],
  imports: [
    MongooseModule.forFeature([
      { name: TransactionModel.name, schema: TransactionSchema },
      { name: MassiveDecreaseModel.name, schema: MassiveDecreaseSchema },
      { name: MassiveIncreaseModel.name, schema: MassiveIncreaseSchema },
      { name: TransactionTypeModel.name, schema: TransactionTypeSchema },
    ]),
    ClientFeatureModule,
    BlockchainModule,
    UserFeatureModule,
    WalletFeatureModule,
    WalletsByClientsFeatureModule,
    TokenFeatureModule,
    LibrariesModule,
    CommonFeatureModule
  ],
  providers: [
    // INDIVIDUAL
    IndividualDecreaseApplicationProvider,
    IndividualIncreaseApplicationProvider,
    // MASSIVE_DECREASE
    CreateMassiveDecreaseApplicationProvider,
    ValidateMassiveDecreaseApplicationProvider,
    ProcessMassiveDecreaseApplicationProvider,
    CancelMassiveDecreaseApplicationProvider,
    GetAllMassiveDecreaseApplicationProvider,
    GetMassiveDecreaseByIdApplicationProvider,
    MassiveDecreaseRepositoryProvider,
    // MASSIVE_INCREASE
    CreateMassiveIncreaseApplicationProvider,
    ValidateMassiveIncreaseApplicationProvider,
    ProcessMassiveIncreaseApplicationProvider,
    CancelMassiveIncreaseApplicationProvider,
    GetAllMassiveIncreaseApplicationProvider,
    GetMassiveIncreaseByIdApplicationProvider,
    MassiveIncreaseRepositoryProvider,
    // TRANSACTION
    TransactionRepositoryProvider,
    GetTransactionByIdApplicationProvider,
    GetAllTransactionApplicationProvider,
    TransactionQueueEmitterApplicationProvider,
    // TRANSACTION_TYPES
    CreateTransactionTypeApplicationProvider,
    TransactionTypeRepositoryProvider
  ]
})
export class TransactionFeatureModule  {

}
