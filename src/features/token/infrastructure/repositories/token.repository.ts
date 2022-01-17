import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, FilterQuery, Model, PopulateOptions, UpdateQuery } from 'mongoose';
import { Token } from '../../domain/entities/token.entity';
import { TokenModel } from '../models/token.model';
import { ITokenRepository } from './token-repository.interface';

@Injectable()
export class TokenRepository implements ITokenRepository {
  constructor(
    @InjectModel(TokenModel.name) private readonly tokenModel: Model<TokenModel>
  ) { }

  public async create(token: Token,  options?: PopulateOptions | Array<PopulateOptions>): Promise<Token> {
    const saveToken = new this.tokenModel(token);

    let model = await saveToken.save();
    if(options) model = await this.tokenModel.populate(model, options);

    return model ? Token.toEntity(model) as Token : null;
  }

  public async update(filter: FilterQuery<TokenModel>, updateQuery: UpdateQuery<TokenModel>, options?: PopulateOptions | Array<PopulateOptions>, session?: ClientSession): Promise<Token> {
    const query = await this.tokenModel.findOneAndUpdate(filter, { ...updateQuery }, { new: true });
    
    let model = await query.save({ session });
    if(options) model = await this.tokenModel.populate(model, options);
  
    return model ? Token.toEntity(model as TokenModel) as Token : null;
  }

  public async findById(id: string, options?: PopulateOptions | Array<PopulateOptions>): Promise<Token> {
    const query = this.tokenModel.findById(id);

    if(options) query.populate(options);
    const model = await query.lean().exec();

    return model ? Token.toEntity(model as TokenModel) as Token : null;
  }

  async findOne(filter: FilterQuery<TokenModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Token> {
    const query = this.tokenModel.findOne(filter);

    if(options) query.populate(options);
    const model = await query.lean().exec();

    return model ? Token.toEntity(model as TokenModel) as Token : null;
  }

  public async findAll(filter?: FilterQuery<TokenModel>, options?: PopulateOptions | Array<PopulateOptions>): Promise<Token[]> {
    const query = this.tokenModel.find(filter);

    if(options) query.populate(options);
    const models = await query.sort({ createdAt: -1 }).lean().exec();

    return models.map((model) => Token.toEntity(model as TokenModel) as Token);
  }

  public async findLastCreated(): Promise<Token> {
    const model = await this.tokenModel.findOne().sort({ createdAt: -1 });
    return model ? Token.toEntity(model) as Token  : null;
  }

}