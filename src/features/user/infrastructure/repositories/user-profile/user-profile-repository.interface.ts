import { ClientSession, FilterQuery, PopulateOptions, UpdateQuery } from "mongoose";
import { User } from "src/features/user/domain/entities/user.entity";
import { UserProfile } from "../../../domain/entities/user-profile.entity";
import { UserProfileModel } from "../../models/user-profile.model";

export interface IUserProfileRepository {
  create(user: UserProfile): Promise<UserProfile>;
  update(filter: FilterQuery<UserProfileModel>, updateQuery: UpdateQuery<UserProfileModel>, options?: PopulateOptions | Array<PopulateOptions>, session?: ClientSession): Promise<UserProfile>
  findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<UserProfile>;
  findOne(filter: FilterQuery<UserProfileModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<UserProfile>; 
  findAll(filter?: FilterQuery<UserProfileModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<UserProfile[]>;
}
