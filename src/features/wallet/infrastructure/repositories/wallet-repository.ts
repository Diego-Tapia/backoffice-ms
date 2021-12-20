import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from '../../domain/entities/wallet.entity';
import { WalletModel } from '../models/wallet.model';
import { IWalletRepository } from './wallet-repository.interface';

@Injectable()
export class WalletRepository implements IWalletRepository {
  constructor(@InjectModel(WalletModel.name) private readonly walletModel: Model<WalletModel>) {}

  public async findById(id: string): Promise<Wallet> {
    const model = await this.walletModel.findById(id);
    return model ? this.toDomainEntity(model) : null;
  }

  public async create(): Promise<Wallet> {
    const wallet: Wallet = {
      address: 'address_1',
      privateKey: 'privateKey_1'
    }
    const savedWallet = await new this.walletModel(wallet).save();
    return this.toDomainEntity(savedWallet)
  }

  private toDomainEntity(model: WalletModel): Wallet {
    const { address, privateKey, _id, balances } = model;
    const walletEntity = new Wallet({
      address,
      privateKey,
      balances,
      id: _id.toString()
    });
    return walletEntity;
  }
}
