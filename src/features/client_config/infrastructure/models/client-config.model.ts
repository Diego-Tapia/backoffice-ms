import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ClientModel } from 'src/features/client/infrastructure/models/client.model';

@Schema({
  timestamps: true,
})
export class ClientConfigModel extends Document {

  @Prop({ type: Types.ObjectId, ref: ClientModel.name })
  clientId: Types.ObjectId;

  @Prop({ required: true })
  logo: string;

  @Prop({ required: true })
  banner: string;

  @Prop({ required: true})
  mainColor: string;

  @Prop({ required: true })
  secondaryColor : string;

  @Prop({ required: true })
  domain: number;

  @Prop({ required: true })
  verifyUser: string;

}

export const ClientConfigSchema = SchemaFactory.createForClass(ClientConfigModel);
