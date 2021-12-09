import { FilterQuery, UpdateQuery } from 'mongoose';
import { Register } from '../../domain/entities/user-register.entity';
import { User } from '../../domain/entities/user.entity';
import { UserModel } from '../models/user.model';

export interface IUserRepository {
  register(userRegister: Register);
  create(user: User): Promise<any>;
  findOne(user: string): Promise<User>;
  findOneQuery(filter: FilterQuery<UserModel>): Promise<User>;
  findAll(filter?: FilterQuery<UserModel>): Promise<User[]>;
  findById(id: string): Promise<User>;
  updateQuery(id: string, updateQuery: UpdateQuery<UserModel>): Promise<User>;
}
