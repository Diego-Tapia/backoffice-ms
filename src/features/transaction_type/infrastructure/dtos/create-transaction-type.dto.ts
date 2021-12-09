import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ETransactionTypes } from "../../domain/enums/transaction-types.enum";

export class CreateTransactionTypeDto {
    @IsString()
    @IsEnum(ETransactionTypes)
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string
}
