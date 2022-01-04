import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { ClientSession, FilterQuery, Model, PopulateOptions, UpdateQuery } from 'mongoose';
import configs from 'src/configs/environments/configs';
import { Register } from 'src/features/admin/domain/entities/registerAdmin.entity';
import { User } from 'src/features/user/domain/entities/user.entity';
import { UserModel } from '../../models/user.model';
import { IUserRepository } from './user-reposiory.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  private userPool: CognitoUserPool;

  constructor(
    @Inject(configs.KEY) private config: ConfigType<typeof configs>,
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.config.cognito_user.user_pool,
      ClientId: this.config.cognito_user.client_id,
    });
  }

  public async create(user: User): Promise<User> {
    const savedUser = await new this.userModel(user).save();
    return User.toEntity(savedUser) as User;
  }

  public async findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<User> {
    const query = this.userModel.findById(id);

    if(options) query.populate(options);
    const model = await query.lean().exec();

    return model ? User.toEntity(model as UserModel) as User : null;
  }

  async findOne(filter: FilterQuery<UserModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<User> {
    const query = this.userModel.findOne(filter);

    if(options) query.populate(options);
    const model = await query.lean().exec();

    return model ? User.toEntity(model as UserModel) as User : null;
  }

  public async findAll(filter?: FilterQuery<UserModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<User[]> {
    const query = this.userModel.find(filter);

    if(options) query.populate(options);
    const models = await query.lean().exec();

    return models.map((model) => User.toEntity(model as UserModel) as User);
  }

  public async update(filter: FilterQuery<UserModel>, updateQuery: UpdateQuery<UserModel>, options?: PopulateOptions | Array<PopulateOptions>, session?: ClientSession): Promise<User> {
    const query = await this.userModel.findOneAndUpdate(filter, { ...updateQuery }, { new: true });
    
    const model = await query.save({ session })
    if(options) await model.populate(options).execPopulate()
  
    return model ? User.toEntity(model as UserModel) as User : null;
  }

  public register(register: Register): Promise<any> {
    const username = register.username;
    const email = register.email;
    const password = register.password;

    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        username,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }
}
