import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, PopulateOptions } from "mongoose";
import { TransactionType } from "../../../domain/entities/transaction-type.entity";
import { TransactionTypeModel } from "../../models/transaction-type.model";
import { ITransactionTypeRepository } from "./transaction-type-repository.interfase";

@Injectable()
export class TransactionTypeRepository implements ITransactionTypeRepository {
  constructor(
    @InjectModel(TransactionTypeModel.name) 
    private readonly transactionTypeModel: Model<TransactionTypeModel>
  ) {}

  public async create(transactionType: TransactionType): Promise<TransactionType> {
    const saveTransactionType = new this.transactionTypeModel(transactionType)
    let model = await saveTransactionType.save()
    return model ? this.toEntity(model) : null
  }

  public async findOne(filter: FilterQuery<TransactionTypeModel>): Promise<TransactionType> {
    const model = await this.transactionTypeModel.findOne(filter).exec();
    return model ? this.toEntity(model) : null;
  }

  public async findById(id: string): Promise<TransactionType> {
    const model = await this.transactionTypeModel.findById(id).exec();
    return model ? this.toEntity(model) : null;
  }

  public async findAll(filter?: FilterQuery<TransactionTypeModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<TransactionType[]> {
    const query = this.transactionTypeModel.find(filter);

    if(options) query.populate(options);
    const models = await query.lean().exec();

    return models.map((model) => TransactionType.toEntity(model as TransactionTypeModel) as TransactionType);
  }

  private toEntity(model: TransactionTypeModel) {
    const { name, description, _id } = model;
    const transactionTypeModelEntity = new TransactionType({ name, description, id: _id })
    return transactionTypeModelEntity
  }
  
}