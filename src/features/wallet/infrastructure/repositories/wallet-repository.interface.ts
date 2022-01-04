import { FilterQuery, PopulateOptions } from 'mongoose';
import { Wallet } from '../../domain/entities/wallet.entity';
import { WalletModel } from '../models/wallet.model';

export interface IWalletRepository {
  create(): Promise<Wallet>;
  findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<Wallet>;
  findOne(filter: FilterQuery<WalletModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Wallet>
}
