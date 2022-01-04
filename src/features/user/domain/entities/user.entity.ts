import { Client } from "src/features/client/domain/entities/client.entity";
import { ClientModel } from "src/features/client/infrastructure/models/client.model";
import { Wallet } from "src/features/wallet/domain/entities/wallet.entity";
import { WalletModel } from "src/features/wallet/infrastructure/models/wallet.model";
import { UserModel } from "../../infrastructure/models/user.model";

export interface IUser {
  customId: string;
  username: string;
  status: string;
  clientId: string | Client;
  walletId?: string | Wallet;
  id?: string;
}

export class User {
  customId: string;
  username: string;
  status: string;
  clientId: string | Client;
  walletId?: string | Wallet;
  id?: string;

  constructor({ customId, username, status, clientId, walletId, id }: IUser) {
    this.customId = customId;
    this.username = username;
    this.status = status;
    this.clientId = clientId;
    this.walletId = walletId;
    this.id = id;
  }
  
  static toEntity(model: UserModel): User | string {
    const { customId, username, status, _id, clientId, walletId } = model;
    
    const isString = typeof model === 'string';
    if (isString) return String(model); 


    const userEntity = new User({
      customId,
      username,
      status,
      clientId: Client.toEntity(clientId as ClientModel),
      id: _id.toString(),
      walletId: Wallet.toEntity(walletId as WalletModel),
    });
    return userEntity;
  }
}
