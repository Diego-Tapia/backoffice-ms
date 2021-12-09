import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class ClientModel extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  cuit: number;

  @Prop({ required: true })
  businessName: string;

  @Prop({ required: true })
  responsible: string;

  @Prop({ required: true })
  phoneNumber: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  industry: string;

}

export const ClientSchema = SchemaFactory.createForClass(ClientModel);
