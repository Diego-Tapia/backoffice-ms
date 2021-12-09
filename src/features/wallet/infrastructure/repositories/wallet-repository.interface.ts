import { Wallet } from '../../domain/entities/wallet.entity';

export interface IWalletRepository {
  findById(id: string): Promise<Wallet>;
}
