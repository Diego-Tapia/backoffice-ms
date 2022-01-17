import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PopulateOptions } from 'mongoose';
import { WalletsByClients } from '../../domain/walletsByclients.entity';
import { WalletsByClientsModel } from '../model/walletsByclients.model';
import { IWalletsByClientsRepository } from './walletsByClients-repository.interface';

@Injectable()
export class WalletsByClientsRepository implements IWalletsByClientsRepository {
  constructor(
    @InjectModel(WalletsByClientsModel.name)
    private readonly walletsByClientsModel: Model<WalletsByClientsModel>,
  ) {}

  public async findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<WalletsByClients> {
    const query = this.walletsByClientsModel.findById(id);

    if(options) query.populate(options);
    const model = await query.lean().exec();

    return model ? WalletsByClients.toEntity(model as WalletsByClientsModel) as WalletsByClients : null;
  }

  async findOne(filter: FilterQuery<WalletsByClientsModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<WalletsByClients> {
    const query = this.walletsByClientsModel.findOne(filter);

    if(options) query.populate(options);
    const model = await query.lean().exec();

    return model ? WalletsByClients.toEntity(model as WalletsByClientsModel) as WalletsByClients : null;
  }

  public async findAll(filter?: FilterQuery<WalletsByClientsModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<WalletsByClients[]> {
    const query = this.walletsByClientsModel.find(filter);

    if(options) query.populate(options);
    const models = await query.sort({ createdAt: -1 }).lean().exec();

    return models.map((model) => WalletsByClients.toEntity(model as WalletsByClientsModel) as WalletsByClients);
  }

}
