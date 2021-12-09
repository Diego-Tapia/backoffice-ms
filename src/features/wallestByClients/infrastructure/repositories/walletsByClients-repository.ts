import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { WalletsByClients } from "../../domain/walletsByClients.entity";
import { WalletsByClientsModel } from "../model/walletByclients.model";
import { IWalletsByClientsRepository } from "./walletsByClients-repository.interface";

@Injectable()
export class WalletsByClientsRepository implements IWalletsByClientsRepository {
  constructor(
    @InjectModel(WalletsByClientsModel.name) private readonly walletsByClientsModel: Model<WalletsByClientsModel>
  ) { }


  async findAll(filter: FilterQuery<WalletsByClientsModel>): Promise<WalletsByClients[]> {
    const result = await this.walletsByClientsModel
      .find(filter)
      .populate({ path: 'clientId' })
      .populate({ path: 'walletId' })
      .exec();
    return result ? result.map(model => this.toEntity(model)) : null;
  
   
  }

  async findById(idClient: string): Promise<WalletsByClients> {
    const result = await this.walletsByClientsModel
      .findById(idClient)
      .populate({ path: 'clientId' })
      .populate({ path: 'walletId' })
      .exec();
    return result ? this.toEntity(result) : null;
  }

  async findOne(filter?: FilterQuery<WalletsByClientsModel>): Promise<WalletsByClients> {
    const result = await this.walletsByClientsModel.findOne({...filter}).exec();
    return result ? this.toEntity(result) : null;
  }
  
  public toEntity(model: WalletsByClientsModel){
    const { clientId, walletId, type } = model;
    const walletsByClients = new WalletsByClients(clientId.toString(), walletId.toString(), type);
    return walletsByClients
  }
}