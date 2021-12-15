import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserModel } from 'src/features/user/infrastructure/models/user.model';
@Schema({
  timestamps: true,
})
export class UserProfileModel extends Document {


  @Prop({ required: true })
  shortName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  dni: number;

  @Prop({ required: true })
  cuil: number;

  @Prop({ required: true })
  avatarUrl: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: number;

  @Prop({ type: Types.ObjectId, ref: UserModel.name })
  userId: Types.ObjectId;
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfileModel);
