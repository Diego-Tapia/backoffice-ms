import { FilterQuery, UpdateQuery } from "mongoose";
import { Role } from "../../domain/entities/role.entity";
import { RoleModel } from "../models/role.model";

export interface IRoleRepository {
  create(role: Role): Promise<Role>;
  findAll(filter?: FilterQuery<RoleModel>): Promise<Role[]>;
}
