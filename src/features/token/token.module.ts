import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenController } from 'src/api/token/token.controller';
import { ApplicabilityModule } from '../applicability/applicability.module';
import { QueueEmitterFeatureModule } from '../queue_emitter/queue-emitter.module';
import { BlockchainModule } from '../shared/blockchain/infrastructure/service/blockchain.module';
import { TransactionTypeFeatureModule } from '../transaction_type/transaction-type.module';
import { WalletsByClientsFeatureModule } from '../wallestByClients/walletsByClients.module';
import { WalletFeatureModule } from '../wallet/wallet.module';
import { CreateTokenApplicationProvider } from './application/create-token/create-token.provider';
import { EmitTokenApplicationProvider } from './application/emit-token/emit-token.provider';
import { GetAllTokensApplicationProvider } from './application/get-all-tokens/get-all-tokens.provider';
import { GetTokenByIdApplicationProvider } from './application/get-token-by-id/get-token-by-id.provider';
import { ReemitTokenApplicationProvider } from './application/reemit-token/reemit-token.provider';
import { UpdateTokenApplicationProvider } from './application/update-token/update-token.provider';
import { TokenModel, TokenSchema } from './infrastructure/models/token.model';
import { TokenRepositoryProvider } from './infrastructure/repositories/token-repository.provider';

@Module({
  controllers: [TokenController],
  imports: [
    TransactionTypeFeatureModule,
    ApplicabilityModule,
    BlockchainModule,
    WalletsByClientsFeatureModule,
    WalletFeatureModule,
    MongooseModule.forFeature([{ name: TokenModel.name, schema: TokenSchema }])],
  providers: [
    TokenRepositoryProvider,
    CreateTokenApplicationProvider,
    UpdateTokenApplicationProvider,
    GetAllTokensApplicationProvider,
    GetTokenByIdApplicationProvider,
    EmitTokenApplicationProvider,
    ReemitTokenApplicationProvider,
  ],
  exports: [
    TokenRepositoryProvider,
  ]
})
export class TokenFeatureModule {}
