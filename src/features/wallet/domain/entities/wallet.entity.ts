import { IBalances } from '../interfaces/balances.interface';

export class Wallet {
  address: string;
  privateKey: string;
  balances?: Array<IBalances>;
  id?: string;

  constructor(address: string, privatekey: string, balances?: Array<IBalances>, id?: string) {
    this.address = address;
    this.privateKey = privatekey;
    this.balances = balances;
    this.id = id;
  }
}
