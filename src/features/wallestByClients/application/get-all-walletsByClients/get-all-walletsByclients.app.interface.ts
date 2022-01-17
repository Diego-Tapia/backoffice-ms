import { WalletsByClients } from '../../domain/walletsByclients.entity';
export interface IGetAllWalletsByClientsApplication {
  execute(): Promise<WalletsByClients[]>;
}
