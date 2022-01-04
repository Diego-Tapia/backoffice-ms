import { ClientSession, FilterQuery, PopulateOptions, UpdateQuery } from 'mongoose';
import { UserRegister } from 'src/features/user/domain/entities/user-register.entity';
import { User } from '../../../domain/entities/user.entity';
import { UserModel } from '../../models/user.model';

export interface IUserRepository {
  register(userRegister: UserRegister): Promise<any>;
  create(user: User): Promise<User>;
  update(filter: FilterQuery<UserModel>, update: UpdateQuery<UserModel>, options?: PopulateOptions | Array<PopulateOptions>, session?: ClientSession): Promise<User>;
  findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<User>;
  findOne(filter: FilterQuery<UserModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<User>; 
  findAll(filter?: FilterQuery<UserModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<User[]>;
}
