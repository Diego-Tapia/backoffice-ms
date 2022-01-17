import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, FilterQuery, Model, PopulateOptions, UpdateQuery } from 'mongoose';
import { Massive } from 'src/features/transaction/domain/entities/massive.entity';
import { MassiveIncreaseModel } from '../../models/massive-increase.model';
import { IMassiveIncreaseRepository } from './massive-increase-repository.interface';

@Injectable()
export class MassiveIncreaseRepository implements IMassiveIncreaseRepository {
  constructor(
    @InjectModel(MassiveIncreaseModel.name)
    private readonly massiveIncreaseModel: Model<MassiveIncreaseModel>,
  ) {}

  public async create(massiveIncrease: Massive,  options?: PopulateOptions | Array<PopulateOptions>): Promise<Massive> {
    const saveMassiveIncrease = new this.massiveIncreaseModel(massiveIncrease);

    let model = await saveMassiveIncrease.save();
    if(options) model = await this.massiveIncreaseModel.populate(model, options);

    return model ? Massive.toEntity(model as MassiveIncreaseModel) : null;
  }

  public async update(filter: FilterQuery<MassiveIncreaseModel>, updateQuery: UpdateQuery<MassiveIncreaseModel>, options?: PopulateOptions | Array<PopulateOptions>, session?: ClientSession): Promise<Massive> {
    const query = await this.massiveIncreaseModel.findOneAndUpdate(filter, { ...updateQuery }, { new: true });
    
    let model = await query.save({ session });
    if(options) model = await this.massiveIncreaseModel.populate(model, options);
  
    return model ? Massive.toEntity(model as MassiveIncreaseModel) : null;
  }

  public async findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<Massive> {
    const query = this.massiveIncreaseModel.findById(id);

    if(options) query.populate(options);
    const model = await query.lean().exec();

    return model ? Massive.toEntity(model as MassiveIncreaseModel) : null;
  }

  async findOne(filter: FilterQuery<MassiveIncreaseModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Massive> {
    const query = this.massiveIncreaseModel.findOne(filter);

    if(options) query.populate(options);
    const model = await query.lean().exec();

    return model ? Massive.toEntity(model as MassiveIncreaseModel) : null;
  }

  public async findAll(filter?: FilterQuery<MassiveIncreaseModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Massive[]> {
    const query = this.massiveIncreaseModel.find(filter);

    if(options) query.populate(options);
    const models = await query.sort({ createdAt: -1 }).lean().exec();

    return models.map((model) => Massive.toEntity(model as MassiveIncreaseModel));
  }

}
