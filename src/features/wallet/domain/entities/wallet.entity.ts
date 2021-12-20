import { IBalances } from '../interfaces/balances.interface';

interface IWallet {
  address: string;
  privateKey: string;
  balances?: Array<IBalances>;
  id?: string;
}

export class Wallet {
  address: string;
  privateKey: string;
  balances?: Array<IBalances>;
  id?: string;

  constructor({
    address,
    privateKey,
    balances,
    id
  }: IWallet) {
    this.address = address;
    this.privateKey = privateKey;
    this.balances = balances;
    this.id = id;
  }
}
