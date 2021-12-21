import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { ERole } from "../../domain/enums/role.enum";

@Schema({
  timestamps: true,
})
export class RoleModel extends Document {
  @Prop({ required: true, enum: ERole })
  name: string;

  @Prop()
  description?: string;
}

export const RoleSchema = SchemaFactory.createForClass(RoleModel);
