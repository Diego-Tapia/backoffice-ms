interface IUser {
  customId: string;
  username: string;
  status: string;
  clientId: string;
  id?: string;
  walletId?: string;
}

export class User {
  customId: string;
  username: string;
  status: string;
  clientId: string;
  id?: string;
  walletId?: string;

  constructor({ 
    customId, 
    username, 
    status, 
    clientId, 
    id, 
    walletId }: IUser
  ) {
    this.customId = customId;
    this.username = username;
    this.status = status;
    this.clientId = clientId;
    this.id = id;
    this.walletId = walletId;
  }
}
