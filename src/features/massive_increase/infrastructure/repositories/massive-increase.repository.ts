import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { MassiveIncrease } from "../../domain/entities/massive-increase.entity";
import { MassiveIncreaseModel } from "../models/massive-increase.model";
import { IMassiveIncreaseRepository } from "./massive-increase-repository.interface";

export class MassiveIncreaseRepository implements IMassiveIncreaseRepository{
  constructor(
    @InjectModel(MassiveIncreaseModel.name) 
    private readonly massiveIncreaseModel: Model<MassiveIncreaseModel>
  ) {}
    
  async create(massiveIncrease: MassiveIncrease): Promise<MassiveIncrease> {
    const saveMassiveIncrease = new this.massiveIncreaseModel(massiveIncrease);
    let model = await saveMassiveIncrease.save();
    return this.toEntity(model);
  };
  async findAll(filter?: FilterQuery<MassiveIncreaseModel>): Promise<MassiveIncrease[]> {
    const models = await this.massiveIncreaseModel.find(filter).exec();
    return models.map(model => this.toEntity(model));

  };
  async findById(id: string): Promise<MassiveIncrease> {
    const model = await this.massiveIncreaseModel.findById(id).exec();
    return model ? this.toEntity(model) : null;
  };

  public async update(id: string, updateQuery: UpdateQuery<MassiveIncreaseModel>): Promise<MassiveIncrease> {
    const model = await this.massiveIncreaseModel.findByIdAndUpdate(id, {...updateQuery}, {new: true})
    return model ? this.toEntity(model) : null;
  }

  private toEntity(model: MassiveIncreaseModel) {
    const { name, 
      status, 
      tokenId, 
      adminId, 
      clientId, 
      detail, 
      _id, 
      recordLengthTotal,
      recordLengthValidatedOk,
      recordLengthValidatedError,
      totalAmountValidated,
      totalAmountExecuted,
      recordLengthExecutedOk,
      recordLengthExecutedError,
      createdAt,
      updatedAt } = model;
    
      const massiveIncreaseEntity = new MassiveIncrease({
      name,
      status,
      tokenId: tokenId.toString(),
      adminId: adminId.toString(),
      clientId: clientId.toString(),
      detail,
      id: _id.toString(),
      recordLengthTotal,
      recordLengthValidatedOk,
      recordLengthValidatedError,
      totalAmountValidated,
      totalAmountExecuted,
      recordLengthExecutedOk,
      recordLengthExecutedError,
      createdAt,
      updatedAt
    });
    return massiveIncreaseEntity;
  }

}
