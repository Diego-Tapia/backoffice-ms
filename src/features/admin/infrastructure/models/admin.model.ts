import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ClientModel } from 'src/features/client/infrastructure/models/client.model';
import { RoleModel } from 'src/features/role/infrastructure/models/role.model';

@Schema({
  timestamps: true,
})
export class AdminModel extends Document {

  @Prop({ required: true })
  shortName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  dni: number;

  @Prop({ required: true })
  cuil: number;

  @Prop()
  avatarUrl: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: number;
 
  @Prop({ type: Types.ObjectId, ref: ClientModel.name })
  clientId: Types.ObjectId;

  @Prop({ required: true })
  username: string;

  // @Prop({ type: Types.ObjectId, ref: RoleModel.name })
  // role: Types.ObjectId;

  // @Prop({ })
  // status:

  @Prop({})
  createdAt: Date;
  
  @Prop({})
  updatedAt: Date;
}

export const AdminSchema = SchemaFactory.createForClass(AdminModel);
