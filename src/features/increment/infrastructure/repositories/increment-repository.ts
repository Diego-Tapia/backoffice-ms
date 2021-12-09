import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from 'src/features/transaction/domain/entities/transaction.entity';
import { TransactionModel } from 'src/features/transaction/infrastructure/models/transaction.model';
import { IIncrementRepository } from './increment-repository.interface';


@Injectable()
export class IncrementRepository implements IIncrementRepository {
  
  constructor(
    @InjectModel(TransactionModel.name) private readonly transactionModel: Model<TransactionModel>,
  ) {}

  public async findAll(): Promise<Transaction[]> {
    const transactionModels = await this.transactionModel.find()
      .sort({ createdAt: -1 })
      .exec();
    return transactionModels.map((transaction) => this.toDomainEntity(transaction));
  }

  public async findById(id: string): Promise<Transaction> {
    const transactionModel = await this.transactionModel.findById(id).exec();
    return this.toDomainEntity(transactionModel);
  }

  private toDomainEntity(model: TransactionModel): Transaction {
    const { hash, walletFromId, walletToId, amount, userId, notes, tokenId, transactionTypeId } = model;
    const transactionEntity = new Transaction({
      hash: hash,
      amount: amount,
      notes: notes,
      token: tokenId.toString(),
      userId: userId.toString(),
      transactionType: transactionTypeId.toString(),
      walletFrom: walletFromId.toString(),
      walletTo: walletToId.toString()
    }
    );
    return transactionEntity;
  }
}
