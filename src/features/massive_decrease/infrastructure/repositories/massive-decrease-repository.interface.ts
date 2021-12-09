import { FilterQuery, UpdateQuery } from "mongoose";
import { MassiveDecrease } from "../../domain/entities/massive-decrease.entity";
import { MassiveDecreaseModel } from "../models/massive-decrease.model";

export interface IMassiveDecreaseRepository {
  create(token: MassiveDecrease): Promise<MassiveDecrease>;
  findAll(filter?: FilterQuery<MassiveDecreaseModel>): Promise<MassiveDecrease[]>;
  findById(id: string): Promise<MassiveDecrease>;
  update(id: string, updateQuery: UpdateQuery<MassiveDecreaseModel>): Promise<MassiveDecrease>
}
