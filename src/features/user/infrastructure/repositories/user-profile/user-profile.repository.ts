import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, FilterQuery, Model, PopulateOptions, UpdateQuery } from 'mongoose';
import { UserProfile } from '../../../domain/entities/user-profile.entity';
import { UserProfileModel } from '../../models/user-profile.model';
import { IUserProfileRepository } from './user-profile-repository.interface';

@Injectable()
export class UserProfileRepository implements IUserProfileRepository {
  constructor(
    @InjectModel(UserProfileModel.name) 
    private readonly userProfileModel: Model<UserProfileModel>,
  ) { }

  public async create(user: UserProfile): Promise<UserProfile> {
    const savedUser = await new this.userProfileModel(user).save();
    return UserProfile.toEntity(savedUser) as UserProfile;
  }

  public async findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<UserProfile> {
    const query = this.userProfileModel.findById(id);
    
    if(options) query.populate(options);
    const model = await query.lean().exec();

    return model ? UserProfile.toEntity(model as UserProfileModel) as UserProfile : null;
  }
  
  async findOne (filter: FilterQuery<UserProfileModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<UserProfile> {
    const query = this.userProfileModel.findOne(filter);

    if(options) query.populate(options);
    const model = await query.lean().exec();

    return model ? UserProfile.toEntity(model as UserProfileModel) as UserProfile : null;
  }

  public async findAll(filter?: FilterQuery<UserProfileModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<UserProfile[]> {
    const query = this.userProfileModel.find(filter);

    if (options) query.populate(options)
    let models = await query.lean().exec();

    // TODO: FILTRAR DESDE EL PARAMETRO PopulateOptions EN EL CASO DE USO
    if (options) models = models.filter(user => user.userId !== null)

    return models.map((model) => UserProfile.toEntity(model as UserProfileModel) as UserProfile);
  }

  public async update(filter: FilterQuery<UserProfileModel>, updateQuery: UpdateQuery<UserProfileModel>, options?: PopulateOptions | Array<PopulateOptions>, session?: ClientSession): Promise<UserProfile> {
    const query = await this.userProfileModel.findOneAndUpdate(filter, { ...updateQuery }, { new: true });

    let model = await query.save({ session });
    if (options) model = await this.userProfileModel.populate(model, options);

    return model ?  UserProfile.toEntity(model as UserProfileModel) as UserProfile : null;
  }
}
