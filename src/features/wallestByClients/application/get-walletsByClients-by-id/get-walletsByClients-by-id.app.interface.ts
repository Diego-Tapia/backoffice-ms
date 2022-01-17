import { WalletsByClients } from '../../domain/walletsByclients.entity';

export interface IGetWalletsByClientsByIdApplication {
  execute(id: string): Promise<WalletsByClients>;
}
