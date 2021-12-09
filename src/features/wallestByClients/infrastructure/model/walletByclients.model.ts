import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ClientModel } from 'src/features/client/infrastructure/models/client.model';
import { WalletModel } from 'src/features/wallet/infrastructure/models/wallet.model';

@Schema({
    timestamps: true,
})

export class WalletsByClientsModel extends Document {

    @Prop({ type: Types.ObjectId, ref: ClientModel.name, required: true })
    clientId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: WalletModel.name, required: true })
    walletId: Types.ObjectId;

    @Prop({ enum: ['EMITTER', 'COLLECTOR'], required: true })
    type: string;
}

export const WalletsByClientsSchema = SchemaFactory.createForClass(WalletsByClientsModel);
