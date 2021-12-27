import { FilterQuery } from "mongoose";
import { UserProfile } from "../../domain/entities/userProfile.entity";
import { UserProfileModel } from "../model/user-profile.model";

export interface IUserProfileRepository {
  create(user: any): Promise<any>;
  findAll(): Promise<UserProfile[]>;
  findById(id: string): Promise<UserProfile>;
  findOne(dni: any): Promise<UserProfile>;
  findOneQuery(filter: FilterQuery<UserProfileModel>): Promise<UserProfile>;
  findByIdAndPopulate(id: string): Promise<UserProfile>;
  findOneQueryAndPopulate(filter: FilterQuery<UserProfileModel>): Promise<UserProfile>
  findAllByClientIdAndPopulate(clientId: string): Promise<UserProfile[]>
  findOneByParams(param: number): Promise<UserProfile>;
}
