import { FilterQuery, UpdateQuery } from 'mongoose';
import { Token } from '../../domain/entities/token.entity';
import { TokenModel } from '../models/token.model';

export interface ITokenRepository {
  create(token: Token): Promise<Token>;
  findAll(filter?: FilterQuery<TokenModel>): Promise<Token[]>;
  findById(id: string): Promise<Token>;
  findLastCreated(): Promise<Token>;
  update(id: string, update: UpdateQuery<TokenModel>): Promise<Token>;
}
