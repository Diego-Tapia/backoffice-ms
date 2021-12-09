import { FilterQuery } from "mongoose";
import { WalletsByClients } from "../../domain/walletsByClients.entity";
import { WalletsByClientsModel } from "../model/walletByclients.model";
export interface IWalletsByClientsRepository {
    findAll(filter: FilterQuery<WalletsByClientsModel>): Promise<WalletsByClients[]>;
    findOne(filter: FilterQuery<WalletsByClientsModel>): Promise<WalletsByClients>;
    findById(idClient: string): Promise<WalletsByClients>;
  }
  