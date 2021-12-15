export class User {
  customId: string;
  username: string;
  status: string;
  clientId: string;
  _id?: string;
  walletId?: string;

  constructor(
    customId: string,
    username: string,
    status: string,
    clientId?: string,
    _id?: string,
    walletId?: string,
  ) {
    this.customId = customId;
    this.username = username;
    this.status = status;
    this.clientId = clientId;
    this._id = _id;
    this.walletId = walletId;
  }
}
