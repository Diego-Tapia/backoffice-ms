import { FilterQuery, PopulateOptions } from "mongoose";
import { WalletsByClients } from "../../domain/walletsByclients.entity";
import { WalletsByClientsModel } from "../model/walletsByclients.model";

export interface IWalletsByClientsRepository {
  findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<WalletsByClients>;
  findOne(filter: FilterQuery<WalletsByClientsModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<WalletsByClients>
  findAll(filter?: FilterQuery<WalletsByClientsModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<WalletsByClients[]>;
}
