import { WalletTypes } from '../../wallet.type';
import { WalletRepository } from './wallet-repository';

export const WalletRepositoryProvider = {
  provide: WalletTypes.INFRASTRUCTURE.REPOSITORY,
  useClass: WalletRepository,
};
