import { ClientSession, FilterQuery, PopulateOptions, UpdateQuery } from 'mongoose';
import { Token } from '../../domain/entities/token.entity';
import { TokenModel } from '../models/token.model';

export interface ITokenRepository {
  create(user: Token,  options?: PopulateOptions | Array<PopulateOptions>): Promise<Token>;
  update(filter: FilterQuery<TokenModel>, update: UpdateQuery<TokenModel>, options?: PopulateOptions | Array<PopulateOptions>, session?: ClientSession): Promise<Token>;
  findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<Token>;
  findOne(filter: FilterQuery<TokenModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Token>; 
  findAll(filter?: FilterQuery<TokenModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Token[]>;
  findLastCreated(): Promise<Token>;

}
