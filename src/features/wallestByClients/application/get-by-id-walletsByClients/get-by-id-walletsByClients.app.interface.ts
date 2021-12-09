import { WalletsByClients } from "../../domain/walletsByClients.entity";


export interface IGetWalletsByClientsByIdApplication {
    execute(id:string): Promise<WalletsByClients>;
  }