import { FilterQuery, PopulateOptions } from "mongoose";
import { Client } from "../../domain/entities/client.entity";
import { ClientModel } from "../models/client.model";

export interface IClientRepository {
  findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<Client>;
  findOne(filter: FilterQuery<ClientModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Client>
  findAll(filter?: FilterQuery<ClientModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Client[]>;
}
