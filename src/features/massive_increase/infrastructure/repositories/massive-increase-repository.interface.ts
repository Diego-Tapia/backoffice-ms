import { FilterQuery, UpdateQuery } from "mongoose";
import { MassiveIncrease } from "../../domain/entities/massive-increase.entity";
import { MassiveIncreaseModel } from "../models/massive-increase.model";

export interface IMassiveIncreaseRepository {
  create(token: MassiveIncrease): Promise<MassiveIncrease>;
  findAll(filter?: FilterQuery<MassiveIncreaseModel>): Promise<MassiveIncrease[]>;
  findById(id: string): Promise<MassiveIncrease>;
  update(id: string, updateQuery: UpdateQuery<MassiveIncreaseModel>): Promise<MassiveIncrease>
}
