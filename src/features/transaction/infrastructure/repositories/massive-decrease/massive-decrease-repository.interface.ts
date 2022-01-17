import { ClientSession, FilterQuery, PopulateOptions, UpdateQuery } from "mongoose";
import { Massive } from "src/features/transaction/domain/entities/massive.entity";
import { MassiveDecreaseModel } from "../../models/massive-decrease.model";

export interface IMassiveDecreaseRepository {
  create(massiveIncrease: Massive, options?: PopulateOptions | Array<PopulateOptions>): Promise<Massive>;
  update(filter: FilterQuery<MassiveDecreaseModel>, update: UpdateQuery<MassiveDecreaseModel>, options?: PopulateOptions | Array<PopulateOptions>, session?: ClientSession): Promise<Massive>
  findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<Massive>;
  findOne(filter: FilterQuery<MassiveDecreaseModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Massive>
  findAll(filter?: FilterQuery<MassiveDecreaseModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Massive[]>;
}
