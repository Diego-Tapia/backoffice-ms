import { WalletsByClients } from "../../domain/walletsByClients.entity";
export interface IGetAllWalletsByClientsApplication {
    execute(): Promise<WalletsByClients[]>;
  }
  