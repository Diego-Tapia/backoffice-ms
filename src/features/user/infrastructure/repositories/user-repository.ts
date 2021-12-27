import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import configs from 'src/configs/environments/configs';
import { Register } from '../../domain/entities/user-register.entity';
import { User } from '../../domain/entities/user.entity';
import { UserModel } from '../models/user.model';
import { IUserRepository } from './user-reposiory.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  private userPool: CognitoUserPool;
  constructor(
    @Inject(configs.KEY)
    private config: ConfigType<typeof configs>,
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.config.cognito_user.user_pool,
      ClientId: this.config.cognito_user.client_id,
    });
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

  public async findOne(username: string): Promise<User> {
    const userModel = await this.userModel.findOne({ username: username }).exec();
    return userModel ? this.toDomainEntity(userModel) : null;
  }

  public async findOneQuery(filter: FilterQuery<UserModel>): Promise<User> {
    const userModel = await this.userModel.findOne(filter).exec();
    return userModel ? this.toDomainEntity(userModel) : null;
  }

  public async updateQuery(id: string, updateQuery: UpdateQuery<UserModel>): Promise<User> {
    const model = await this.userModel.findByIdAndUpdate(id, { ...updateQuery }, { new: true });
    return model ? this.toDomainEntity(model) : null;
  }

  public async create(user: User): Promise<User> {
    const savedUser = await new this.userModel(user).save();
    return this.toDomainEntity(savedUser);
  }

  public async findById(id: string): Promise<User> {
    const userModel = await this.userModel.findById(id).exec();
    return this.toDomainEntity(userModel);
  }

  public async findAll(filter?: FilterQuery<UserModel>): Promise<User[]> {
    const UserModel = await this.userModel.find(filter).exec();
    return UserModel.map((user) => this.toDomainEntity(user));
  }

  public async findOneByParams(param: string): Promise<User> {
    const userModel = await this.userModel
      .findOne( { $or: [ { customId: param }, { username: param } ] } )
      .exec();
    return userModel ? this.toDomainEntity(userModel) : null;
  }

  private toDomainEntity(model: UserModel): User {
    const { customId, username, status, _id, clientId, walletId } = model;
    const userEntity = new User({
      customId,
      username,
      status,
      clientId: clientId.toString(),
      id: _id.toString(),
      walletId: walletId.toString(),
    });
    return userEntity;
  }
}
