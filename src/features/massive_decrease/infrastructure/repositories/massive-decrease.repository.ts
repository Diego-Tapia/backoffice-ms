import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { MassiveDecrease } from "../../domain/entities/massive-decrease.entity";
import { MassiveDecreaseModel } from "../models/massive-decrease.model";
import { IMassiveDecreaseRepository } from "./massive-decrease-repository.interface";

export class MassiveDecreaseRepository implements IMassiveDecreaseRepository{
  constructor(
    @InjectModel(MassiveDecreaseModel.name) 
    private readonly massiveDecreaseModel: Model<MassiveDecreaseModel>
  ) {}
    
  async create(massiveDecrease: MassiveDecrease): Promise<MassiveDecrease> {
    const saveMassiveDecrease = new this.massiveDecreaseModel(massiveDecrease);
    let model = await saveMassiveDecrease.save();
    return this.toEntity(model);
  };
  async findAll(filter?: FilterQuery<MassiveDecreaseModel>): Promise<MassiveDecrease[]> {
    const models = await this.massiveDecreaseModel.find(filter).exec();
    return models.map(model => this.toEntity(model));

  };
  async findById(id: string): Promise<MassiveDecrease> {
    const model = await this.massiveDecreaseModel.findById(id).exec();
    return model ? this.toEntity(model) : null;
  };

  public async update(id: string, updateQuery: UpdateQuery<MassiveDecreaseModel>): Promise<MassiveDecrease> {
    const model = await this.massiveDecreaseModel.findByIdAndUpdate(id, {...updateQuery}, {new: true})
    return model ? this.toEntity(model) : null;
  }

  private toEntity(model: MassiveDecreaseModel) {
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

      const massiveDecreaseEntity = new MassiveDecrease({
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
    return massiveDecreaseEntity;
  }
}
