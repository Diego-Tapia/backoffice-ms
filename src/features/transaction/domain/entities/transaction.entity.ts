import { Client } from "src/features/client/domain/entities/client.entity";
import { Token } from "src/features/token/domain/entities/token.entity";
import { TokenModel } from "src/features/token/infrastructure/models/token.model";
import { UserProfile } from "src/features/user/domain/entities/user-profile.entity";
import { User } from "src/features/user/domain/entities/user.entity";
import { UserModel } from "src/features/user/infrastructure/models/user.model";
import { Wallet } from "src/features/wallet/domain/entities/wallet.entity";
import { WalletModel } from "src/features/wallet/infrastructure/models/wallet.model";
import { TransactionTypeModel } from "../../infrastructure/models/transaction-type.model";
import { TransactionModel } from "../../infrastructure/models/transaction.model";
import { TransactionType } from "./transaction-type.entity";

interface ITransactionProps {
  transactionType: string | TransactionType;
  token: string | Token;
  walletFrom: string | Wallet;
  walletTo: string | Wallet;
  amount: number;
  user: string | User;
  notes?: string;
  id?: string;
  hash?: string;
}

export class Transaction {
  transactionType: string | TransactionType;
  token: string | Token;
  walletFrom: string | Wallet;
  walletTo: string | Wallet;
  amount: number;
  user: string | User;
  notes?: string;
  hash?: string;
  id?: string;
  destination?: UserProfile | Client

  constructor({
    transactionType,
    token,
    walletFrom,
    walletTo,
    amount,
    user,
    notes,
    hash,
    id,
  }: ITransactionProps) {
    this.transactionType = transactionType;
    this.token = token;
    this.walletFrom = walletFrom;
    this.walletTo = walletTo;
    this.amount = amount;
    this.user = user;
    this.notes = notes;
    this.hash = hash;
    this.id = id;
  }

  static toEntity(model: TransactionModel): Transaction | string {
    const { 
      transactionTypeId,
      tokenId,
      walletFromId,
      walletToId,
      amount,
      userId,
      notes,
      hash,
      _id,

    } = model;

    const isString = typeof model === 'string';
    if (isString) return String(model);
    
    const transactionEntity = new Transaction({
      transactionType: TransactionType.toEntity(transactionTypeId as TransactionTypeModel),
      token: Token.toEntity(tokenId as TokenModel),
      walletFrom: Wallet.toEntity(walletFromId as WalletModel),
      walletTo: Wallet.toEntity(walletToId as WalletModel),
      amount,
      user: User.toEntity(userId as UserModel),
      hash,
      id: _id.toString(),
      notes
    })

    return transactionEntity
  }

}
