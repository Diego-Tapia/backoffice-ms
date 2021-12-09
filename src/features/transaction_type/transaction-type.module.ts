import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionTypeController } from "src/api/transaction-type/transaction-type.controller";
import { CreateTransactionTypeApplicationProvider } from "./application/create-transaction-type/create-transaction-type.provider";
import { TransactionTypeModel, TransactionTypeSchema } from "./infrastructure/models/transaction-type.model";
import { TransactionTypeRepositoryProvider } from "./infrastructure/repositories/transaction-type-repository.provider";

@Module({
  controllers: [
    TransactionTypeController
  ],
  imports: [
    MongooseModule.forFeature([{ name: TransactionTypeModel.name, schema: TransactionTypeSchema }]),
  ],
  providers: [
    CreateTransactionTypeApplicationProvider,
    TransactionTypeRepositoryProvider
  ],
  exports: [
    TransactionTypeRepositoryProvider
  ]
  })
export class TransactionTypeFeatureModule {}
