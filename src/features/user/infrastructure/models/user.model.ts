import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ClientModel } from 'src/features/client/infrastructure/models/client.model';
import { WalletModel } from 'src/features/wallet/infrastructure/models/wallet.model';
import { EUserStatus } from '../../domain/enums/user.status.enum';

@Schema({
  timestamps: true,
})
export class UserModel extends Document {
  @Prop({ required: true })
  customId: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, enum: EUserStatus })
  status: string;

  @Prop({ type: Types.ObjectId, ref: ClientModel.name })
  clientId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: WalletModel.name })
  walletId?: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
