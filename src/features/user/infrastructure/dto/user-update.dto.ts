import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsNumber,
  IsMongoId,
  IsOptional,
} from 'class-validator';
export class UserUpdateDTO {
  
    @IsString()
  @IsNotEmpty()
  customId: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsMongoId()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsOptional()
  walletId: string;

}
