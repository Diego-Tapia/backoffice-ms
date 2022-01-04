import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PopulateOptions } from 'mongoose';
import { Wallet } from '../../domain/entities/wallet.entity';
import { WalletModel } from '../models/wallet.model';
import { IWalletRepository } from './wallet-repository.interface';

@Injectable()
export class WalletRepository implements IWalletRepository {
  constructor(
    @InjectModel(WalletModel.name) 
    private readonly walletModel: Model<WalletModel>
  ) {}

  public async create(): Promise<Wallet> {
    const wallet: Wallet = new Wallet ({ address: 'address_1', privateKey: 'privateKey_1'})
    const model = await new this.walletModel(wallet).save();
    
    return Wallet.toEntity(model as WalletModel) as Wallet
  }

  public async findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<Wallet> {
    const query = this.walletModel.findById(id);

    if(options) query.populate(options);
    const model = await query.lean().exec();

    return model ? Wallet.toEntity(model as WalletModel) as Wallet : null;
  }

  async findOne(filter: FilterQuery<WalletModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Wallet> {
    const query = this.walletModel.findOne(filter);

    if(options) query.populate(options);
    const model = await query.lean().exec();

    return model ? Wallet.toEntity(model as WalletModel) as Wallet : null;
  }
}
