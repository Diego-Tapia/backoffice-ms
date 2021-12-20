import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { Applicabilities } from 'src/features/applicability/domain/entities/applicabilities.entity';
import { ApplicabilityModel } from 'src/features/applicability/infrastructure/models/applicability.model';
import { TransactionType } from 'src/features/transaction_type/domain/entities/transaction-type.entity';
import { TransactionTypeModel } from 'src/features/transaction_type/infrastructure/models/transaction-type.model';
import { Token } from '../../domain/entities/token.entity';
import { TokenModel } from '../models/token.model';
import { ITokenRepository } from './token-repository.interface';

@Injectable()
export class TokenRepository implements ITokenRepository {
  constructor(
    @InjectModel(TokenModel.name) private readonly tokenModel: Model<TokenModel>
  ) {}

  public async create(token: Token): Promise<Token> {
    const saveToken = new this.tokenModel(token)
    let model = await (await saveToken.save())
      .populate({path: 'applicabilities'})
      .populate({path: 'operations'})
      .execPopulate()
    return model ? this.toEntityAndPopulate(model) : null
  }

  public async findAll(filter?: FilterQuery<TokenModel>): Promise<Token[]> {
    const models = await this.tokenModel
      .find(filter)
      .populate({path: 'applicabilities'})
      .populate({path: 'operations'})
      .exec();
    return models ? models.map(token => this.toEntityAndPopulate(token)) : null;
  }

  public async findById(id: string): Promise<Token> {
    const model = await this.tokenModel.findById(id)
      .populate({path: 'applicabilities'})
      .populate({path: 'operations'})
      .exec();
    return model ? this.toEntityAndPopulate(model) : null;
  }

  public async findLastCreated(): Promise<Token> {
    const model = await this.tokenModel.findOne().sort({createdAt: -1});
    return model ? this.toEntity(model) : null;
  }

  public async update(id: string, updateQuery: UpdateQuery<any>): Promise<Token> {
    console.log(updateQuery)
    const model = await this.tokenModel.findByIdAndUpdate(id, {...updateQuery}, {new: true})
      .populate({path: 'applicabilities'})
      .populate({path: 'operations'})
      .exec()
    return model ? this.toEntityAndPopulate(model) : null;
  }




  private toEntity(model: TokenModel){
    const { 
      shortName,
      symbol,
      price,
      money,
      status,
      bcItemId,
      emited,
      applicabilities,
      operations,
      clientId,
      description,
      validFrom,
      validTo,
      initialAmount,
      transferable,
      observation,
      _id,
      createdAt,
      updatedAt } = model
    const tokenEntity = new Token({
      id: _id.toString(),
      shortName,
      symbol,
      price,
      money,
      status,
      bcItemId,
      emited,
      applicabilities: applicabilities.map(applicability => applicability.toString()),
      operations: operations.map(operation => operation.toString()),
      clientId: clientId.toString(),
      description,
      validFrom,
      validTo,
      initialAmount,
      transferable,
      observation,
      createdAt,
      updatedAt
    })
    return tokenEntity
  }

  private toEntityAndPopulate(model: TokenModel){
    const { 
      shortName,
      symbol,
      price,
      money,
      status,
      bcItemId,
      emited,
      applicabilities,
      operations,
      clientId,
      description,
      validFrom,
      validTo,
      initialAmount,
      transferable,
      observation,
      _id,
      createdAt,
      updatedAt 
    } = model
    const tokenEntity = new Token({
      id: _id.toString(),
      shortName,
      symbol,
      price,
      money,
      status,
      bcItemId,
      emited,
      applicabilities: applicabilities.map((applicability: any) => this.toEntityApplicability(applicability)),
      operations: operations.map((operation: any) => this.toEntityTransactionType(operation)),
      clientId: clientId.toString(),
      description,
      validFrom,
      validTo,
      initialAmount,
      transferable,
      observation,
      createdAt,
      updatedAt
    })
    return tokenEntity
  }

  private toEntityApplicability(model: ApplicabilityModel){
    const { name, description, clientId, _id  } = model
    const applicabilities = new Applicabilities({ 
        name, 
        clientId: clientId.toString(), 
        description,
        id: _id
    })
    return applicabilities;
  }

  private toEntityTransactionType(model: TransactionTypeModel) {
    const {name, description, _id } = model;
    const transactionType = new TransactionType({ name, description, id: _id });
    return transactionType
  }
}