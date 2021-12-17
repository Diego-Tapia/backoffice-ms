import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { TokenModel } from 'src/features/token/infrastructure/models/token.model';
import { IBalances } from '../../domain/interfaces/balances.interface';

@Schema({
  _id:true, timestamps: true,
})
export class WalletModel extends Document {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  privateKey: string;

  @Prop(raw([{
    tokenId: { type: Types.ObjectId, ref: TokenModel.name },
    amount: { type: Number }
  }]))
  balances: IBalances[];

}

export const WalletSchema = SchemaFactory.createForClass(WalletModel);
