import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserProfile } from '../../domain/entities/userProfile.entity';
import { UserProfileModel } from '../model/user-profile.model';
import { IUserProfileRepository } from './user-repository.interface';

@Injectable()
export class UserRepository implements IUserProfileRepository {
  constructor(@InjectModel(UserProfileModel.name) private readonly userModel: Model<UserProfileModel>) { }

  public async create(user: UserProfile): Promise<UserProfile> {
    const savedUser = await new this.userModel(user).save();
    return this.toDomainEntity(savedUser);
  }

  public async findAll(): Promise<UserProfile[]> {
    const userModels = await this.userModel.find().exec();
    return userModels.map((user) => this.toDomainEntity(user));
  }

  public async findById(id: string): Promise<UserProfile> {
    const userModel = await this.userModel.findById(id).exec();
    return this.toDomainEntity(userModel);
  }

  public async findOne(dni: number): Promise<UserProfile> {
    const userModel = await this.userModel.findOne({ dni: dni }).exec();
    return userModel ? this.toDomainEntity(userModel) : null;
  }

  public async findOneQuery(filter: FilterQuery<UserProfileModel>): Promise<UserProfile> {
    const userModel = await this.userModel.findOne({ ...filter }).exec();
    return userModel ? this.toDomainEntity(userModel) : null;
  }

  public async findOneUser(username: string): Promise<UserProfile> {
    const userModel = await this.userModel.findOne({ username: username }).exec();
    return userModel ? this.toDomainEntity(userModel) : null;
  }

  private toDomainEntity(model: UserProfileModel):UserProfile{
    const { shortName, lastName, dni, cuil, avatarUrl, email, phoneNumber, userId } = model;
    const userEntity = new UserProfile({
      shortName,
      lastName,
      dni,
      cuil,
      avatarUrl,
      email,
      phoneNumber,
      userId: userId.toString(),
    });
    return userEntity;
  }
}
