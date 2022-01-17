import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ClientSession, FilterQuery, Model, PopulateOptions, UpdateQuery } from "mongoose";
import { Massive } from "src/features/transaction/domain/entities/massive.entity";
import { MassiveDecreaseModel } from "../../models/massive-decrease.model";
import { IMassiveDecreaseRepository } from "./massive-decrease-repository.interface";

@Injectable()
export class MassiveDecreaseRepository implements IMassiveDecreaseRepository{
  constructor(
    @InjectModel(MassiveDecreaseModel.name) 
    private readonly massiveDecreaseModel: Model<MassiveDecreaseModel>
  ) {}
    
  public async create(massiveIncrease: Massive,  options?: PopulateOptions | Array<PopulateOptions>): Promise<Massive> {
    const saveMassiveIncrease = new this.massiveDecreaseModel(massiveIncrease);

    let model = await saveMassiveIncrease.save();
    if(options) model = await this.massiveDecreaseModel.populate(model, options);

    return model ? Massive.toEntity(model as MassiveDecreaseModel) : null;
  }

  public async update(filter: FilterQuery<MassiveDecreaseModel>, updateQuery: UpdateQuery<MassiveDecreaseModel>, options?: PopulateOptions | Array<PopulateOptions>, session?: ClientSession): Promise<Massive> {
    const query = await this.massiveDecreaseModel.findOneAndUpdate(filter, { ...updateQuery }, { new: true });
    
    let model = await query.save({ session });
    if(options) model = await this.massiveDecreaseModel.populate(model, options);
  
    return model ? Massive.toEntity(model as MassiveDecreaseModel) : null;
  }

  public async findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<Massive> {
    const query = this.massiveDecreaseModel.findById(id);

    if(options) query.populate(options);
    const model = await query.lean().exec();

    return model ? Massive.toEntity(model as MassiveDecreaseModel) : null;
  }

  async findOne(filter: FilterQuery<MassiveDecreaseModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Massive> {
    const query = this.massiveDecreaseModel.findOne(filter);

    if(options) query.populate(options);
    const model = await query.lean().exec();

    return model ? Massive.toEntity(model as MassiveDecreaseModel) : null;
  }

  public async findAll(filter?: FilterQuery<MassiveDecreaseModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Massive[]> {
    const query = this.massiveDecreaseModel.find(filter);

    if(options) query.populate(options);
    const models = await query.sort({ createdAt: -1 }).lean().exec();

    return models.map((model) => Massive.toEntity(model as MassiveDecreaseModel));
  }
}
