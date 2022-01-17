import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApplicabilityModel } from 'src/features/applicability/infrastructure/models/applicability.model';
import { ClientModel } from 'src/features/client/infrastructure/models/client.model';
import { TransactionTypeModel } from 'src/features/transaction/infrastructure/models/transaction-type.model';
import { ETokenStatus } from '../../domain/enums/token-status.enum';

@Schema({
  timestamps: true,
})
export class TokenModel extends Document {
  @Prop({ required: true, maxlength: 30 })
  shortName: string;

  @Prop({ required: true, maxlength: 5 })
  symbol: string;

  @Prop({ required: true, min: 1 })
  price: number;

  @Prop({ required: true, maxlength: 5 })
  money: string;

  @Prop({ required: true, enum: ETokenStatus })
  status: string;

  @Prop({ required: true, min: 0 })
  bcItemId: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: ApplicabilityModel.name }] })
  applicabilities: Types.ObjectId[] | ApplicabilityModel[];

  @Prop({ type: [{ type: Types.ObjectId, ref: TransactionTypeModel.name }] })
  operations: Types.ObjectId[] | TransactionTypeModel[];

  @Prop()
  description?: string;

  @Prop()
  validFrom?: Date;

  @Prop()
  validTo?: Date;

  @Prop({ type: Types.ObjectId, ref: ClientModel.name })
  clientId: Types.ObjectId | ClientModel;

  @Prop({ required: true, default: false })
  emited: boolean;

  @Prop({ required: true })
  transferable: boolean;

  @Prop({ required: true })
  initialAmount: number;

  @Prop()
  observation: string;
  
  @Prop({})
  createdAt: Date;
  
  @Prop({ })
  updatedAt: Date;
}

export const TokenSchema = SchemaFactory.createForClass(TokenModel);
