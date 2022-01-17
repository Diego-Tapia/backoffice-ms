import { Client } from 'src/features/client/domain/entities/client.entity';
import { ClientModel } from 'src/features/client/infrastructure/models/client.model';
import { Wallet } from 'src/features/wallet/domain/entities/wallet.entity';
import { WalletModel } from 'src/features/wallet/infrastructure/models/wallet.model';
import { WalletsByClientsModel } from '../infrastructure/model/walletsByclients.model';

export interface WalletsByClientsProps {
  clientId: string | Client;
  walletId: string | Wallet;
  type: string;
  id?: string
}
export class WalletsByClients {

  clientId: string | Client;
  walletId: string | Wallet;
  type: string;
  id?: string

  constructor({ clientId, type, walletId, id }: WalletsByClientsProps) {
    this.clientId = clientId;
    this.walletId = walletId;
    this.type = type;
    this.id = id
  }

  static toEntity(model: WalletsByClientsModel): WalletsByClients | string {
    const {
       clientId,
       walletId,
       type,
      _id,
    } = model;

    const isString = typeof model === 'string';
    if (isString) return String(model);
    
    const transactionEntity = new WalletsByClients({
      walletId: Wallet.toEntity(walletId as WalletModel),
      clientId: Client.toEntity(clientId as ClientModel),
      type,
      id: _id.toString()
    })

    return transactionEntity
  }
}
