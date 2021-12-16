import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class RoleModel extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;
}

export const RoleSchema = SchemaFactory.createForClass(RoleModel);
