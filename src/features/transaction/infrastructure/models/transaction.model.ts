import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TokenModel } from 'src/features/token/infrastructure/models/token.model';
import { TransactionTypeModel } from 'src/features/transaction/infrastructure/models/transaction-type.model';
import { UserModel } from 'src/features/user/infrastructure/models/user.model';
import { WalletModel } from 'src/features/wallet/infrastructure/models/wallet.model';

@Schema({
  timestamps: true,
})
export class TransactionModel extends Document {

  @Prop({ required: true })
  hash: string;

  @Prop({ type: Types.ObjectId, ref: TransactionTypeModel.name})
  transactionTypeId: Types.ObjectId | TransactionTypeModel;

  @Prop({ type: Types.ObjectId, ref: TokenModel.name})
  tokenId: Types.ObjectId | TokenModel;

  @Prop({ type: Types.ObjectId, ref: WalletModel.name})
  walletFromId: Types.ObjectId | WalletModel;

  @Prop({ type: Types.ObjectId, ref: WalletModel.name})
  walletToId: Types.ObjectId | WalletModel;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: UserModel.name })
  userId: Types.ObjectId | UserModel;

  @Prop({ })
  notes: string;
}

export const TransactionSchema = SchemaFactory.createForClass(TransactionModel);
