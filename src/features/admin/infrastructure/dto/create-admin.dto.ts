import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEmail,
  IsMongoId,
} from 'class-validator';

export class CreateAdminDto {

  @IsString()
  @IsNotEmpty()
  shortName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
  
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  dni: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  cuil: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  phoneNumber: number;

  @IsString()
  avatarUrl: string;

  @IsMongoId()
  @IsNotEmpty()
  clientID: string;

  @IsString()
  @IsNotEmpty()
  username: string;

}
