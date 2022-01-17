import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document} from 'mongoose';
import { ETransactionTypes } from '../../domain/enums/transaction-types.enum';

@Schema({
  timestamps: true,
})
export class TransactionTypeModel extends Document {

  @Prop({ required: true, enum: ETransactionTypes })
  name: string;

  @Prop({ required: true})
  description: string;

}

export const TransactionTypeSchema = SchemaFactory.createForClass(TransactionTypeModel);
