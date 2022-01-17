import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenController } from 'src/api/token/token.controller';
import { ApplicabilityModule } from '../applicability/applicability.module';
import { BlockchainModule } from '../shared/blockchain/infrastructure/service/blockchain.module';
import { WalletsByClientsFeatureModule } from '../wallestByClients/walletsByclients.module';
import { WalletFeatureModule } from '../wallet/wallet.module';
import { CreateTokenApplicationProvider } from './application/create-token/create-token.provider';
import { EmitTokenApplicationProvider } from './application/emit-token/emit-token.provider';
import { GetAllTokensApplicationProvider } from './application/get-all-tokens/get-all-tokens.provider';
import { GetTokenApplicationProvider } from './application/get-token/get-token.provider';
import { ReemitTokenApplicationProvider } from './application/reemit-token/reemit-token.provider';
import { UpdateTokenApplicationProvider } from './application/update-token/update-token.provider';
import { TokenModel, TokenSchema } from './infrastructure/models/token.model';
import { TokenRepositoryProvider } from './infrastructure/repositories/token-repository.provider';

@Module({
  controllers: [TokenController],
  imports: [
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
    GetTokenApplicationProvider,
    EmitTokenApplicationProvider,
    ReemitTokenApplicationProvider,
  ],
  exports: [
    TokenRepositoryProvider,
  ]
})
export class TokenFeatureModule {}
