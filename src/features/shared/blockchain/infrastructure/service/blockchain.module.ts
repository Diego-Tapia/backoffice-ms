import { Module } from '@nestjs/common';
import { LibrariesModule } from 'src/features/shared/libraries/libraries.module';
import { BlockchainTokenServiceProvider } from './token/blockchain-token-service.provider';
import { BlockchainTransactionServiceProvider } from './transaction/blockchain-transaction-service.provider';
import { BlockchainWalletServiceProvider } from './wallet/blockchain-wallet.provider';


@Module({
  imports: [
    LibrariesModule
  ],
  providers: [
    BlockchainTokenServiceProvider,
    BlockchainTransactionServiceProvider,
    BlockchainWalletServiceProvider
  ],
  exports: [
    BlockchainTokenServiceProvider,
    BlockchainTransactionServiceProvider,
    BlockchainWalletServiceProvider
  ]
})

export class BlockchainModule {}
