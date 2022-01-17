import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PopulateOptions } from 'mongoose';
import { Client } from '../../domain/entities/client.entity';
import { ClientModel } from '../models/client.model';
import { IClientRepository } from './client-repository.interface';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(
    @InjectModel(ClientModel.name)
    private readonly clientModel: Model<ClientModel>,
  ) {}

  public async findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<Client> {
    const query = this.clientModel.findById(id);

    if(options) query.populate(options);
    const model = await query.lean().exec();

    return model ? Client.toEntity(model as ClientModel) as Client : null;
  }

  async findOne(filter: FilterQuery<ClientModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Client> {
    const query = this.clientModel.findOne(filter);

    if(options) query.populate(options);
    const model = await query.lean().exec();

    return model ? Client.toEntity(model as ClientModel) as Client : null;
  }

  public async findAll(filter?: FilterQuery<ClientModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Client[]> {
    const query = this.clientModel.find(filter);

    if(options) query.populate(options);
    const models = await query.sort({ createdAt: -1 }).lean().exec();

    return models.map((model) => Client.toEntity(model as ClientModel) as Client);
  }

}
