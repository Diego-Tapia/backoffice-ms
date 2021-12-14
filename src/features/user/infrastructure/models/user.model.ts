import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ClientModel } from 'src/features/client/infrastructure/models/client.model';
import { WalletModel } from 'src/features/wallet/infrastructure/models/wallet.model';

@Schema({
  timestamps: true,
})
export class UserModel extends Document {
  @Prop({ required: true })
  custom_id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, enum: ['ACTIVE', 'BLOCKED', 'PENDING_APPROVE', 'INACTIVE'] })
  status: string;

  @Prop({ type: Types.ObjectId, ref: ClientModel.name })
  client_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: WalletModel.name })
  wallet_id?: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
