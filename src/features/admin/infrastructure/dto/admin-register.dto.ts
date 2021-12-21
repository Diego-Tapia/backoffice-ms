import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsNumber,
  IsMongoId,
} from 'class-validator';
export class AdminRegisterDTO {
  
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  dni: number;

  @IsString()
  @IsNotEmpty()
  shortName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  cuil: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  phoneNumber: number;

  @IsString()
  avatarUrl: string;
  
  @IsMongoId()
  @IsNotEmpty()
  clientId: string;

  // @IsMongoId()
  // @IsNotEmpty()
  // role: string;
}
