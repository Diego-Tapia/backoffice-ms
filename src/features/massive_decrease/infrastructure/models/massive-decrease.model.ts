import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AdminModel } from 'src/features/admin/infrastructure/models/admin.model';
import { ClientModel } from 'src/features/client/infrastructure/models/client.model';
import { TokenModel } from 'src/features/token/infrastructure/models/token.model';
import { MassiveDecreaseDetail } from '../../domain/entities/massive-decrease-detail.entity';
import { EMassiveDecreaseStatus } from '../../domain/enums/massive-decrease-status.enum';

@Schema({
  timestamps: true,
})
export class MassiveDecreaseModel extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: EMassiveDecreaseStatus })
  status: EMassiveDecreaseStatus;

  @Prop({ required: true, ref: TokenModel.name })
  tokenId: Types.ObjectId;

  @Prop({ required: true, ref: AdminModel.name })
  adminId: Types.ObjectId;

  @Prop({ required: true, ref: ClientModel.name })
  clientId: Types.ObjectId;

  @Prop({ })
  recordLengthTotal: number;

  @Prop({  })
  recordLengthValidatedOk: number;

  @Prop({  })
  recordLengthValidatedError: number;
  
  @Prop({  })
  totalAmountValidated: number;

  @Prop({  })
  totalAmountExecuted: number;
  
  @Prop({  })
  recordLengthExecutedOk: number;

  @Prop({  })
  recordLengthExecutedError: number;
  
  @Prop({ required: true})
  detail: Array<MassiveDecreaseDetail> 

  @Prop({})
  createdAt: Date;
  
  @Prop({ })
  updatedAt: Date;

}

export const MassiveDecreaseSchema = SchemaFactory.createForClass(MassiveDecreaseModel);