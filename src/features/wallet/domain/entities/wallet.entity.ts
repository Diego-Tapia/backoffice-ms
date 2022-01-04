import { WalletModel } from '../../infrastructure/models/wallet.model';
import { IBalances } from '../interfaces/balances.interface';

export interface IWallet {
  address: string;
  privateKey: string;
  id?: string;
  balances?: IBalances[];
}
export class Wallet {
  address: string;
  privateKey: string;
  id?: string;
  balances?: IBalances[];

  constructor({ address, privateKey, balances = [], id }: IWallet) {
    this.address = address;
    this.privateKey = privateKey;
    this.id = id;
    this.balances = balances;
  }

  public getBalance(tokenId: string) {
    return this.balances.find((balance) => balance.tokenId.toString() === tokenId);
  }

  public hasEnoughFunds(tokenId: string, amount: number) {
    const balance = this.getBalance(tokenId);
    return balance && balance.amount >= amount;
  }

  public getTotal() {
    return this.balances.reduce((acc, balance) => (acc += +balance.amount, acc), 0);
  }

  static toEntity(model: WalletModel): Wallet | string {
    const { address, privateKey, _id, balances } = model;

    const isString = typeof model === 'string';
    if (isString) return String(model); 

    const walletEntity = new Wallet({
      address, 
      privateKey,
      id: _id.toString(),
      balances: balances
    });
    
    return walletEntity;
  }
}
