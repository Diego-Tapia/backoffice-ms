import { ClientSession, FilterQuery, PopulateOptions, UpdateQuery } from "mongoose";
import { Massive } from "src/features/transaction/domain/entities/massive.entity";
import { MassiveIncreaseModel } from "../../models/massive-increase.model";

export interface IMassiveIncreaseRepository {
  create(massiveIncrease: Massive, options?: PopulateOptions | Array<PopulateOptions>): Promise<Massive>;
  update(filter: FilterQuery<MassiveIncreaseModel>, update: UpdateQuery<MassiveIncreaseModel>, options?: PopulateOptions | Array<PopulateOptions>, session?: ClientSession): Promise<Massive>
  findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<Massive>;
  findOne(filter: FilterQuery<MassiveIncreaseModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Massive>
  findAll(filter?: FilterQuery<MassiveIncreaseModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Massive[]>;
}
